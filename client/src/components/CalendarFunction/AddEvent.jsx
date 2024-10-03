import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

const AddFunc = ({ show, onHide, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    meeting_link: "",
    startDateTime: "",
    endDateTime: "",
    category: "Personal",
    recurrence: "Non-recurring",
    reminder: "No reminder",
    location: "",
    owner: localStorage.getItem("username"),
    guests: [],
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
    document.addEventListener("mousedown", handleClickOutside); // Attach the event listener to detect clicks outside
  }, [onHide]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    // Prepare the event details
    const eventDetails = {
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
    onAddEvent(eventDetails);

    resetForm();
    onHide();
  };

  // Function to reset the form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      meeting_link: "",
      startDateTime: "",
      endDateTime: "",
      category: "Personal",
      recurrence: "Non-recurring",
      reminder: "No reminder",
      location: "",
      guests: [],
    });
    setErrors({});
  };

  const Button = () => {
    return (
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="p-2 text-white bg-black rounded hover:bg-yellow-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <Form
      func="Add Event"
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
      recurrence={formData.recurrence}
      reminder={formData.reminder}
      guests={formData.guests}
      handleChange={handleChange}
      errStart={errors.startDateTime}
      errEnd={errors.endDateTime}
      locationIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      linkIcon={<FontAwesomeIcon icon={faLink} />}
    />
  );
};

export default AddFunc;
