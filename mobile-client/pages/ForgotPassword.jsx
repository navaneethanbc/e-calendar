// ForgotPassword.jsx
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

const ForgotPassword = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/users/otp",
        {
          username,
        }
      );
      Alert.alert("Success", response.data.message);
      setOtpSent(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    if (!otp.trim()) {
      setError("OTP cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/users/otpverify",
        { username, otp }
      );

      Alert.alert("Success", "OTP verified successfully");
      navigation.navigate("ResetPassword", { username });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtext}>
            Please enter your username to reset your password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError("");
            }}
          />

          <View style={styles.errorContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <Text style={styles.invisibleText}>PlaceHolder</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtext}>
            An OTP has been sent to your email. Please enter it below to
            proceed.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your OTP"
            value={otp}
            onChangeText={(text) => {
              setOtp(text);
              setError("");
            }}
          />
          <View style={styles.errorContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <Text style={styles.invisibleText}>PlaceHolder</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      )}
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
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  subtext: {
    fontSize: 14,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
  },
  errorContainer: {
    minHeight: 30,
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
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
