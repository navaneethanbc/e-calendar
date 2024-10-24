import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "./constants/colors";
import Welcome from "./pages/Welcome";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Calendar from "./pages/Calendar";
import Monthly from "./pages/Monthly";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import AgendaWithEvents from "./pages/AgendaWithEvents";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Calendar" component={Monthly} />
      <Stack.Screen name="Daily" component={Daily} />
      <Stack.Screen name="Weekly" component={Weekly} />
      <Stack.Screen name="Agenda" component={AgendaWithEvents} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
};

export default AppStack;
