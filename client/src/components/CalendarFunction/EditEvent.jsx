import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Form from "./Form";
import {
  DeleteRounded,
  EditLocationRounded,
  EditRounded,
  LinkRounded,
} from "@mui/icons-material";

const EditFunc = ({
  show,
  onHide,
  onEditEvent,
  onDeleteEvent,
  selectedEvent,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    meeting_link: "",
    startDateTime: "",
    endDateTime: "",
    category: "Personal",
    recurrence: "",
    reminder: "",
    location: "",
    guests: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    startDateTime: "",
    endDateTime: "",
  });

  const popupRef = useRef(null);

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Snackbar handlers
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onHide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onHide]);

  useEffect(() => {
    if (selectedEvent) {
      const updatedFormData = {
        id: selectedEvent.id || "",
        title: selectedEvent.title || "",
        description: selectedEvent.extendedProps?.description || "",
        meeting_link: selectedEvent.extendedProps?.meeting_link || "",
        startDateTime: selectedEvent.start
          ? moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm")
          : "",
        endDateTime: selectedEvent.end
          ? moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm")
          : "",
        category: selectedEvent.extendedProps?.category || "Personal",
        recurrence: selectedEvent.extendedProps?.recurrence || "",
        reminder: selectedEvent.extendedProps?.reminder || "",
        location: selectedEvent.extendedProps?.location || "",
        guests: selectedEvent.extendedProps?.guests || [],
        owner: selectedEvent.extendedProps?.owner,
      };

      setFormData(updatedFormData);
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setErrors({});
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.startDateTime) {
      newErrors.startDateTime = "Start date is required.";
    }
    if (!formData.endDateTime) {
      newErrors.endDateTime = "End date is required.";
    } else if (
      formData.startDateTime &&
      moment(formData.startDateTime).toDate() >=
        moment(formData.endDateTime).toDate()
    ) {
      newErrors.endDateTime = "End date must be after start date.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.owner === localStorage.getItem("username")) {
      const updatedEvent = {
        id: selectedEvent.id,
        title: formData.title,
        description: formData.description,
        meeting_link: formData.meeting_link,
        starts_at: moment(formData.startDateTime).toDate(),
        ends_at: moment(formData.endDateTime).toDate(),
        category: formData.category,
        recurrence: formData.recurrence,
        reminder: formData.reminder,
        location: formData.location,
        guests: formData.guests,
      };

      if (formData.id) {
        updatedEvent._id = formData.id;
      }
      onEditEvent(updatedEvent);
    } else {
      setSnackbarMessage("No have to access to edit or delete this event");
      setSnackbarOpen(true);
    }

    resetForm();
    onHide();
  };

  const handleDelete = () => {
    if (
      selectedEvent &&
      selectedEvent.id &&
      selectedEvent.extendedProps.owner === localStorage.getItem("username")
    ) {
      onDeleteEvent(selectedEvent.id);
    } else {
      setSnackbarMessage("No have to access to edit or delete this event");
      setSnackbarOpen(true);
      onHide();
    }
  };

  const Button = () => {
    return (
      <div className="flex items-center space-x-2">
        <button
          className="p-2 text-white bg-black rounded hover:bg-yellow-500"
          onClick={handleSubmit}
        >
          <EditRounded />
        </button>

        <button
          className="p-2 text-white bg-red-500 rounded hover:bg-red-900"
          onClick={handleDelete}
          aria-label="Delete Event"
        >
          <DeleteRounded />
        </button>
      </div>
    );
  };

  return (
    <div>
      <Form
        EventFunction="Edit Event"
        show={show}
        popupRef={popupRef}
        buttons={Button()}
        event={formData}
        handleChange={handleChange}
        errors={errors}
        locationIcon={<EditLocationRounded />}
        linkIcon={<LinkRounded />}
      />

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        TransitionComponent={Fade}
        message={snackbarMessage}
        autoHideDuration={1800}
        ContentProps={{
          sx: {
            backgroundColor: "#fee27f",
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "16px",
          },
        }}
      />
    </div>
  );
};

export default EditFunc;
