import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Form from "./Form";
import { AddLinkRounded, AddLocationRounded } from "@mui/icons-material";

const AddFunc = ({ showForm, hideForm, handleAddEvent }) => {
  const owner = localStorage.getItem("username");
  const [formData, setFormData] = useState({
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

  const popupRef = useRef(null); // Create a ref for the popup

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        hideForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuestChange = (e) => {
    const value = e.target.value;
    const guestsArray = value
      .split(",")
      .map((guest) => guest.trim())
      .filter(Boolean);
    setFormData((prevData) => ({
      ...prevData,
      guests: guestsArray,
    }));
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
      owner: owner,
    };
    handleAddEvent(eventDetails);

    resetForm();
    hideForm();
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
      recurrence: "",
      reminder: "",
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
      EventFunction="Add Event"
      showForm={showForm}
      popupRef={popupRef}
      buttons={Button()}
      event={formData}
      handleChange={handleChange}
      handleGuestChange={handleGuestChange}
      errors={errors}
      locationIcon={<AddLocationRounded />}
      linkIcon={<AddLinkRounded />}
    />
  );
};

export default AddFunc;
