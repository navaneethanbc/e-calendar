import { Event } from "../models/event.model.js";
import { EventGuest } from "../models/event_guest.model.js";
import { incrementDate, dateLimit } from "../utils/eventUtils.js";
import { Notification } from "../models/notification.model.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  const session = await Event.startSession();
  session.startTransaction();

  try {
    const { guests, ...rest } = req.body;

    const events = [];

    // create the parent event
    const event = await Event.create([rest], { session });

    events.push(event[0]); // add the parent event to the events array

    // create the recurring events
    if (req.body.recurrence) {
      const recurringEvents = await createRecurringEvents(
        rest,
        event[0]._id,
        session
      );

      events.push(...recurringEvents); // add the recurring events to the events array
    }

    // create the event guests relationships
    if (guests && guests.length > 0) {
      for (const e of events) {
        await Promise.all(
          guests.map(async (guest) => {
            await EventGuest.create(
              [
                {
                  event_id: e._id,
                  guest: guest,
                },
              ],
              { session }
            );
          })
        );
      }
    }

    // await Promise.all(
    //   guests.map((guest) => {
    //     Notification.create(
    //       [
    //         {
    //           username: guest,
    //           category: "Invite",
    //           description: "",
    //           designated_time: new Date(),
    //           event_id: event[0]._id,
    //         },
    //       ],
    //       { session }
    //     );
    //   })
    // );

    await session.commitTransaction();
    res.status(201).json({ message: "Event created successfully." });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const createRecurringEvents = async (event, parent_event_id, session) => {
  const { starts_at, ends_at, ...remaining } = event;
  const recurringEvents = [];

  try {
    let current = incrementDate(new Date(event.starts_at), event.recurrence);
    const recurrenceEnd = dateLimit(
      new Date(event.starts_at),
      event.recurrence
    );
    const eventDuration = new Date(event.ends_at) - new Date(event.starts_at);

    while (current <= recurrenceEnd) {
      const recurringEvent = {
        starts_at: current,
        ends_at: new Date(current.getTime() + eventDuration),
        parent_event_id: parent_event_id,
        ...remaining,
      };

      recurringEvents.push(recurringEvent);

      current = incrementDate(current, event.recurrence);
    }

    return await Event.create(recurringEvents, { session });
  } catch (error) {
    throw new Error(error.message);
  }
};
// ths is navanee s new code but not support for me need to check
// export const getEvents = async (req, res) => {
//   try {
//     const { username, from, to, title } = req.body;

//     let events = [];

//     const addConditions = (queryArray) => {
//       if (from && to) {
//         queryArray.push({
//           $or: [
//             { starts_at: { $gte: from, $lte: to } },
//             { ends_at: { $gte: from, $lte: to } },
//           ],
//         });
//       }

//       if (title) {
//         queryArray.push({ title: { $regex: title, $options: "i" } });
//       }
//     };

//     const ownEventQuery = [{ owner: username }, { category: "Personal" }];
//     addConditions(ownEventQuery);

//     const ownEvents = await Event.find({
//       $and: ownEventQuery,
//     });

//     events.push(...ownEvents);

//     let branchEvents = [];

//     const branch = (await User.findOne({ username: username })).branch;

//     const sameBranchUsers = (await User.find({ branch: branch })).map(
//       (user) => user.username
//     );

//     if (sameBranchUsers.length > 0) {
//       const branchEventQuery = [
//         { owner: { $in: sameBranchUsers } },
//         { category: "Branch" },
//       ];

//       addConditions(branchEventQuery);

//       branchEvents = await Event.find({
//         $and: branchEventQuery,
//       });
//     }

//     events.push(...branchEvents);

//     let bankEvents = [];

//     const bankEventQuery = [{ category: "Bank" }];

//     addConditions(bankEventQuery);

//     bankEvents = await Event.find({
//       $and: bankEventQuery,
//     });

//     events.push(...bankEvents);

//     let invitedEvents = [];

//     const eventGuests = await EventGuest.find(
//       { $and: [{ username: username }, { status: "Accepted" }] },
//       { event_id: 1 }
//     );

//     if (eventGuests.length > 0) {
//       const inviteEventQuery = [
//         { _id: { $in: eventGuests.map((eventGuest) => eventGuest.event_id) } },
//       ];

//       addConditions(inviteEventQuery);

//       invitedEvents = await Event.find({
//         $and: inviteEventQuery,
//       });
//     }

//     events.push(...invitedEvents);

//     res.status(200).json({ events });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getEvents = async (req, res) => {
  try {
   
    const { username, from, to, title } = req.body;

    //check is "from" before than of  "to" or not
    if (new Date(from) > new Date(to)) {
      return res.status(400).json({ message: 'Invalid date range' });
    }
    //check username if this usename has any events
    // if it take more time then comment it
    const event = await Event.findOne({"owner":username})
    if(!event){
      return res.status(404).json({message:"this user have no events or username is  wrong"})
    } 
    const addConditions = (queryArray) => {
      if (from && to) {
        queryArray.push({
          $or: [
            { starts_at: { $gte: new Date(from), $lte: new Date(to) } },
            { ends_at: { $gte: new Date(from), $lte: new Date(to) } },
          ],
        });
      }

      if (title && title.trim() !== '') {
        queryArray.push({ title: { $regex: title.trim(), $options: "i" } });
      }

      //check if category exist then 
      // if (category && category.trim() !== '') {
      //   queryArray.push({ category: category.trim() });
      // }
    };

    const query = { owner: username };
    const conditions = [];
    addConditions(conditions);

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    const ownEvents = await Event.find(query);

    const eventGuests = await EventGuest.find(
      { username: username, status: "Accepted" },
      { event_id: 1 }
    );

    let invitedEvents = [];

    if (eventGuests.length > 0) {
      const inviteEventIds = eventGuests.map(guest => guest.event_id);
      const inviteQuery = { 
        _id: { $in: inviteEventIds },
        ...conditions.length > 0 ? { $and: conditions } : {}
      };

      invitedEvents = await Event.find(inviteQuery);
    }

    const events = [...ownEvents, ...invitedEvents];

    if (events.length === 0) {
      return res.status(200).json({ message: 'No events found', events });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error('Error in getEvents:', error);
    res.status(500).json({ message: error.message });
  }
};



export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editEvent = async (req, res) => {
  const session = await Event.startSession();
  session.startTransaction();

  try {
    const { guests, editType, ...rest } = req.body;

    // edit the main event
    await Event.findByIdAndUpdate(req.params.id, rest, { session });

    // delete the old event guests
    await EventGuest.deleteMany({ event_id: req.params.id }, { session });

    // create the new event guests
    await Promise.all(
      guests.map(async (guest) => {
        await EventGuest.create(
          [
            {
              event_id: req.params.id,
              guest: guest,
            },
          ],
          { session }
        );
      })
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
    res.status(200).json({ message: "Event updated successfully." });
  }
};

export const deleteEvent = async (req, res) => {
  // have to add creating notifications for the guests
  const session = await Event.startSession();
  session.startTransaction();

  try {
    const { deleteType } = req.body;
    let deletedEvents = [];

    const event = await Event.findByIdAndDelete(req.params.id, { session });

    deletedEvents.push(event._id);

    if (deleteType !== "this event") {
      let query;

      if (event.parent_event_id) {
        if (deleteType === "this and following events") {
          query = {
            $and: [
              { parent_event_id: event.parent_event_id },
              { starts_at: { $gt: event.starts_at } },
            ],
          };
        } else {
          query = {
            $or: [
              { parent_event_id: event.parent_event_id },
              { _id: event.parent_event_id },
            ],
          };
        }
      } else {
        query = { parent_event_id: event._id };
      }

      const eventsToDelete = await Event.find(query, { _id: 1 }, { session })
        .select("_id")
        .then((events) => events.map((e) => e._id));

      if (eventsToDelete.length > 0) {
        await Event.deleteMany({ _id: { $in: eventsToDelete } }, { session });
      }

      deletedEvents.push(...eventsToDelete);
    }

    await EventGuest.deleteMany(
      { event_id: { $in: deletedEvents } },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// get availability of a user
export const getAvailablity = async (req, res) => {
  try {
    const { username, from, to } = req.body;

    const events = await Event.find(
      {
        $and: [
          { owner: username },
          {
            $or: [
              { starts_at: { $gte: from, $lte: to } },
              { ends_at: { $gte: from, $lte: to } },
            ],
          },
        ],
      },
      { _id: 0, category: 1, starts_at: 1, ends_at: 1 }
    );

    const invitedEvents = await EventGuest.find(
      { $and: [{ guest: username }, { status: "Accepted" }] },
      { event_id: 1 }
    );

    invitedEvents.forEach(async (invitedEvent) => {
      const event = await Event.findById(invitedEvent.event_id, {
        category: 1,
        starts_at: 1,
        ends_at: 1,
        _id: 0,
      });
      events.push(event);
    });

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
