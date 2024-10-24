import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { listTimeZones } from "timezone-support";
import RNPickerSelect from "react-native-picker-select";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CreateEvent = ({ route, onClose }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    meeting_link: "",
    location: "",
    guests: "",
    category: "Personal",
    recurrence: "Non-recurring",
    reminder: "No reminder",
  });

  const [errors, setErrors] = useState({});
  const timezones = listTimeZones();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleChange = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const handleCreateEvent = () => {
    // Validation logic can be added here

    // Perform the API request to create the event here
    console.log("Event created:", event);
    onClose(); // Close the modal after creating the event
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Create Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={event.title}
          onChangeText={(text) => handleChange("title", text)}
          aria-required="true"
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={event.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD HH:MM"
          value={event.startDateTime}
          onChangeText={(text) => handleChange("startDateTime", text)}
        />
        {errors.startDateTime && (
          <Text style={styles.error}>{errors.startDateTime}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD HH:MM"
          value={event.endDateTime}
          onChangeText={(text) => handleChange("endDateTime", text)}
        />
        {errors.endDateTime && (
          <Text style={styles.error}>{errors.endDateTime}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Meeting Link"
          value={event.meeting_link}
          onChangeText={(text) => handleChange("meeting_link", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={event.location}
          onChangeText={(text) => handleChange("location", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Guests"
          value={event.guests}
          onChangeText={(text) => handleChange("guests", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Category"
          value={event.category}
          onChangeText={(text) => handleChange("category", text)}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Recurrence"
          value={event.recurrence}
          onChangeText={(text) => handleChange("recurrence", text)}
        /> */}
        <RNPickerSelect
          onValueChange={(value) => handleChange("recurrence", value)}
          items={["Non-recurring", "Daily", "Weekly", "Monthly", "Yearly"].map(
            (option) => ({
              label: option,
              value: option,
            })
          )}
          // placeholder={{ label: "Non-recurring", value: null }}
          style={{ viewContainer: styles.pickerInput }}
        />

        <TextInput
          style={styles.input}
          placeholder="Reminder"
          value={event.reminder}
          onChangeText={(text) => handleChange("reminder", text)}
        />

        <Button title="Save Event" onPress={handleCreateEvent} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  label: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 12,
  },
  input: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 6,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
  pickerInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
  },
});

export default CreateEvent;
