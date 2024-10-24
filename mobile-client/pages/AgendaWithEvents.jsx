import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const AgendaWithEvents = () => {
  const navigation = useNavigation();

  // Function to handle drawer opening
  const openDrawer = () => {
    navigation.openDrawer(); // Opens side drawer
  };

  return (
    <View style={styles.startView}>
      {/* Optional Button for Drawer */}
      <View style={styles.header}>
        <Button title="Open Drawer" onPress={openDrawer} />
      </View>

      {/* Calendar component to navigate on date press */}
      <View style={styles.calendarView}>
        <Calendar
          hideExtraDays={false}
          onDayPress={(day) => {
            navigation.navigate("Daily", { selectedDate: day.dateString });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  startView: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  header: {
    padding: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  calendarView: {
    width: "100%",
    height: "100%",
  },
});

export default AgendaWithEvents;
