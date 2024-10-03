import React from 'react';

const ShowEvents = ({ searchResult }) => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResult.length ? (
          searchResult.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">{event.title}</h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Starts:</span> 
                    {new Date(event.start).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Ends:</span> 
                    {new Date(event.end).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Category:</span> 
                    {event.extendedProps.category}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Description:</span> 
                    {event.extendedProps.description || 'No description'}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Location:</span> 
                    {event.extendedProps.location || 'No location'}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Meeting Link:</span> 
                    {event.extendedProps.meeting_link || 'No meeting link'}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Reminder:</span> 
                    {event.extendedProps.reminder || 'No reminder'}
                  </p>
                  <p><span className="font-semibold text-gray-700">Recurrence:</span> 
                  {event.extendedProps.reccurence || 'No recurrence'}
                </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h2 className="text-2xl font-bold text-gray-500">No such events</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEvents;