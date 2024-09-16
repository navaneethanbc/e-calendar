import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faMapMarkerAlt,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

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
    reccurence: "Non-recurring",
    reminder: "No reminder",
    location: "",
  });
  const [errors, setErrors] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  const popupRef = useRef(null); // Create a ref for the popup

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
        reccurence: selectedEvent.extendedProps?.reccurence || "Non-recurring",
        reminder: selectedEvent.extendedProps?.reminder || "No reminder",
        location: selectedEvent.extendedProps?.location || "",
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

    const updatedEvent = {
      id: selectedEvent.id,
      title: formData.title,
      description: formData.description,
      meeting_link: formData.meeting_link,
      starts_at: moment(formData.startDateTime).toDate(),
      ends_at: moment(formData.endDateTime).toDate(),
      category: formData.category,
      reccurence: formData.reccurence,
      reminder: formData.reminder,
      location: formData.location,
    };

    if (formData.id) {
      // Make sure the id exists for the event update
      updatedEvent._id = formData.id;
    }
    onEditEvent(updatedEvent);
    resetForm();
    onHide();
  };

  const handleDelete = () => {
    if (selectedEvent && selectedEvent.id) {
      onDeleteEvent(selectedEvent.id);
    }
  };

  const Button = () => {
    return (
      <div className="flex items-center space-x-2">
        <button
          className="p-2 text-white bg-black rounded hover:bg-yellow-500"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>

        <button
          className="p-2 text-white bg-red-500 rounded hover:bg-red-900"
          onClick={handleDelete}
          aria-label="Delete Event"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  };

  return (
    <Form
      func="Edit Event"
      show={show}
      popupRef={popupRef}
      buttons={Button()}
      title={formData.title}
      description={formData.description}
      startDateTime={formData.startDateTime}
      endDateTime={formData.endDateTime}
      meeting_link={formData.meeting_link}
      location={formData.location}
      category={formData.category}
      reccurence={formData.reccurence}
      reminder={formData.reminder}
      handleChange={handleChange}
      errStart={errors.startDateTime}
      errEnd={errors.endDateTime}
      locationIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      linkIcon={<FontAwesomeIcon icon={faLink} />}
    />
  );
};

export default EditFunc;
