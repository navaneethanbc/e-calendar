import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import colors from "../constants/colors";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    employee_id: "",
    branch: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigation = useNavigation();

  const options = ["Branch A", "Branch B", "Branch C", "Branch D"];

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email address cannot be empty",
      }),
    employee_id: Joi.string()
      .pattern(new RegExp(/^(ADM|MNG|EMP|TRN)[0-9]{6}$/))
      .required()
      .messages({
        "string.pattern.base": "Please enter a valid Employee ID",
        "string.empty": "Employee ID cannot be empty",
      }),
    branch: Joi.string().required().messages({
      "string.empty": "Please select a branch",
    }),
    username: Joi.string().alphanum().required().messages({
      "string.alphanum": "Username must contain only alphabets and numbers",
      "string.empty": "Username cannot be empty",
    }),
    password: passwordComplexity().required().messages({
      "passwordComplexity.tooShort":
        "Password must contain atleast 8 characters.",
      "passwordComplexity.lowercase":
        "Password must contain atleast one lowercase letter.",
      "passwordComplexity.uppercase":
        "Password must contain atleast one uppercase letter.",
      "passwordComplexity.numeric": "Password must contain atleast one number.",
      "passwordComplexity.symbol": "Password must contain atleast one symbol",
      "string.empty": "Password cannot be empty.",
    }),
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    setError("");
  };

  const handleRegister = async () => {
    const { firstname, surname, password, confirmPassword, ...restUserData } =
      user;

    if (!firstname || !surname) {
      setError("Please fill both the name fields");
      return;
    }

    // Validate user data
    const validation = schema.validate(
      {
        email: user.email,
        employee_id: user.employee_id,
        branch: user.branch,
        username: user.username,
        password: user.password,
      },
      { abortEarly: true }
    );
    if (validation.error) {
      setError(validation.error.details[0].message);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const firstName =
      firstname.trim().charAt(0).toUpperCase() +
      firstname.trim().slice(1).toLowerCase();
    const surName =
      surname.trim().charAt(0).toUpperCase() +
      surname.trim().slice(1).toLowerCase();
    const fullname = `${firstName} ${surName}`;

    const userData = { fullname, password, ...restUserData };

    try {
      const url = "https://e-calendar-cocq.vercel.app/users/register";
      const res = await axios.post(url, userData);

      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Signin");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="First name"
          onChangeText={(text) => handleChange("firstname", text)}
          value={user.firstname}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          onChangeText={(text) => handleChange("surname", text)}
          value={user.surname}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email address"
          onChangeText={(text) => handleChange("email", text)}
          value={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          onChangeText={(text) => handleChange("employee_id", text)}
          value={user.employee_id}
          autoCapitalize="none"
        />

        <RNPickerSelect
          onValueChange={(value) => handleChange("branch", value)}
          items={options.map((option) => ({ label: option, value: option }))}
          placeholder={{ label: "Select a branch...", value: null }}
          style={{ viewContainer: styles.pickerInput }}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => handleChange("username", text)}
          value={user.username}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => handleChange("password", text)}
          value={user.password}
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => handleChange("confirmPassword", text)}
          value={user.confirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.errorContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.invisibleText}>PlaceHolder</Text>
          )}
        </View>

        <Text style={styles.termsText}>
          By clicking "Get Started", you agree to our{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Terms")}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            Privacy Policy
          </Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Signin")}
          >
            Sign in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
    fontSize: 16,
  },
  pickerInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 6,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    marginTop: 10,
    fontSize: 14,
  },
  errorContainer: {
    minHeight: 8,
    alignSelf: "flex-start",
  },
  invisibleText: {
    color: "transparent",
    fontSize: 13,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  termsText: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default Register;
