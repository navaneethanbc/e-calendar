import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Monthly = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.startView}>
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
    margin: 0,
  },
  calendarView: {
    width: "100%",
    height: "100%",
  },
});

export default Monthly;
