import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
// import ResetPassword from "./ForgotPassword/ResetPassword";

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    setError("");
  };

  const handleSignin = async () => {
    if (!user.username) {
      setError("Username is required");
      return;
    }

    if (!user.password) {
      setError("Password is required");
      return;
    }

    try {
      const url = "https://e-calendar-cocq.vercel.app/users/login";
      const res = await axios.post(url, user);
      // Store credentials (You can use AsyncStorage for token storage)
      // For now, local storage for testing
      await AsyncStorage.setItem("token", res.data.accessToken);
      await AsyncStorage.setItem("role", res.data.role);
      await AsyncStorage.setItem("fullname", res.data.name);
      await AsyncStorage.setItem("username", user.username);

      // Navigate to the calendar screen after successful login
      navigation.navigate("Calendar");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        // setError("Something went wrong. Please try again later.");
        Alert.alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => handleChange("username", text)}
        value={user.username}
        autoCapitalize="none"
        returnKeyType="next"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange("password", text)}
        value={user.password}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={handleSignin}
      />

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot password?
      </Text>

      <View style={styles.errorContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.invisibleText}>PlaceHolder</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.signinText}>
        New to Calendar?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Register")}
        >
          Register Now
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    alignSelf: "flex-end",
    fontSize: 14,
  },
  errorContainer: {
    minHeight: 8,
    alignSelf: "flex-start",
  },
  invisibleText: {
    color: "transparent",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  signinText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default Signin;
