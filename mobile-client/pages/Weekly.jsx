import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
  TimelineList,
} from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const INITIAL_TIME = { hour: 0, minutes: 0 };
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Weekly = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeObject, setTimeObject] = useState(INITIAL_TIME);
  const [selectedOption, setSelectedOption] = useState(null);

  const onDateChanged = (date) => {
    setCurrentDate(date);
  };

  const createNewEvent = (timeString, timeObject) => {
    setTimeObject(timeObject);
    setModalVisible(true);
  };

  const handleChoice = (choice) => {
    setSelectedOption(choice);
    setModalVisible(false);
    navigation.navigate(choice, {
      date: currentDate,
      time: `${timeObject.hour}:${timeObject.minutes}`,
    });
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      showTodayButton
    >
      <View style={styles.container}>
        <WeekCalendar />
        <TimelineList
          events={events}
          timelineProps={{
            onBackgroundLongPress: createNewEvent,
          }}
          showNowIndicator
          scrollToFirst={false}
        />
      </View>

      {/* Modal for creating an event, reminder, or appointment */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select an Option:</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateEvent")}
            >
              <Text style={styles.modalButtonText}>Create Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateReminder")}
            >
              <Text style={styles.modalButtonText}>Create Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateAppointment")}
            >
              <Text style={styles.modalButtonText}>Create Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "7%",
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  modalText: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  modalButton: {
    backgroundColor: "#FCC507AB",
    padding: "3.5%",
    borderRadius: 5,
    margin: height * 0.01,
  },
  modalButtonText: {
    fontSize: height * 0.02,
    color: "black",
  },
});

export default Weekly;
