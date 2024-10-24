import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Menu, MenuItem, Snackbar, Fade } from "@mui/material";
import Form from "./Form";
import {
  CloseRounded,
  DeleteRounded,
  EditLocationRounded,
  EditRounded,
  LinkRounded,
} from "@mui/icons-material";
import { Button as MUIButton, IconButton } from "@mui/material";

const EditFunc = ({
  showForm,
  hideForm,
  handleEditEvent,
  handleDeleteEvent,
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

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // State for Delete Dropdown Menu
  const [anchor, setAnchor] = useState(null);
  const openMenu = Boolean(anchor);

  // Snackbar handlers
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
      handleEditEvent(updatedEvent);
    } else {
      setSnackbarMessage("No access to edit or delete this event");
      setSnackbarOpen(true);
    }

    resetForm();
    hideForm();
  };

  const handleMenuClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleDelete = (type) => {
    if (
      selectedEvent &&
      selectedEvent.id &&
      selectedEvent.extendedProps.owner === localStorage.getItem("username")
    ) {
      handleDeleteEvent(selectedEvent.id, type);
    } else {
      setSnackbarMessage("No access to edit or delete this event");
      setSnackbarOpen(true);
    }
    handleMenuClose();
    hideForm();
  };

  const handleClose = () => {
    resetForm();
    hideForm();
  };

  const ActionButtons = () => {
    return (
      <div className="flex items-center space-x-2">
        <MUIButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<EditRounded />}
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#fee27f" },
          }}
        >
          Edit
        </MUIButton>

        <IconButton
          aria-label="Delete Event"
          onClick={handleMenuClick}
          sx={{
            color: "white",
            backgroundColor: "red",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "darkred" },
          }}
        >
          <DeleteRounded />
        </IconButton>
        <Menu anchorEl={anchor} open={openMenu} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleDelete("single")}>This event</MenuItem>
          <MenuItem onClick={() => handleDelete("following")}>
            This event and the following events
          </MenuItem>
          <MenuItem onClick={() => handleDelete("all")}>All events</MenuItem>
        </Menu>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </div>
    );
  };

  return (
    <div>
      <Form
        EventFunction="Edit Event"
        showForm={showForm}
        buttons={ActionButtons()}
        event={formData}
        handleChange={handleChange}
        handleGuestChange={handleGuestChange}
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
