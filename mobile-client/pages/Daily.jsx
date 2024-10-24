import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { CalendarProvider, TimelineList } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const INITIAL_TIME = { hour: 0, minutes: 0 };

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Daily = ({ route }) => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(
    route.params?.selectedDate || new Date().toISOString().split("T")[0]
  );
  const [events, setEvents] = useState([]);
  const timelineRef = useRef(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeObject, setTimeObject] = useState(INITIAL_TIME);

  const onDateChanged = (date) => {
    setCurrentDate(date);
  };

  const createNewEvent = (timeString, timeObject) => {
    setTimeObject(timeObject);
    handleChoice("CreateEvent");
  };

  const formattedDate = (date) => {
    const dateObject = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObject.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (
      route.params?.selectedDate &&
      route.params.selectedDate !== currentDate
    ) {
      setCurrentDate(route.params.selectedDate);
      navigation.setParams({ selectedDate: null });
      if (timelineRef.current) {
        timelineRef.current.scrollToDate(route.params.selectedDate);
      }
    }
  }, [route.params?.selectedDate, currentDate]);

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
  };

  const handleChoice = (choice) => {
    setSelectedOption(choice);
    // setModalVisible(false);
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
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{formattedDate(currentDate)}</Text>
        </View>
        <TimelineList
          events={events}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
          ref={timelineRef}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateBox: {
    backgroundColor: "#FCC507AB",
    padding: "2%",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    fontSize: height * 0.03,
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

export default Daily;
