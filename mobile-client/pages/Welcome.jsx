import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import mobilebg from "../assets/mobilebg.png";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[colors.primary, colors.secondary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={mobilebg}
            style={{
              width: 320,
              height: 320,
              alignSelf: "center",
              top: "10%",
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              position: "absolute",
              top: 350,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: 800,
                color: colors.lightblack,
              }}
            >
              Let's Get
            </Text>
            <Text
              style={{
                fontSize: 46,
                fontWeight: 800,
                color: colors.lightblack,
              }}
            >
              Started
            </Text>
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors.lightblack,
                  marginVertical: 4,
                }}
              >
                Organize your life effortlessly
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors.lightblack,
                }}
              >
                Plan, manage, and achieve more.
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={[styles.buttonText]}>Join Now</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Already have an account?
                <Text
                  style={styles.signInLink}
                  onPress={() => navigation.navigate("Signin")}
                >
                  {" "}
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightblack,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  secondaryButtonText: {
    color: "#4CAF50",
  },
  signInText: {
    fontSize: 16,
    color: "#4a4a4a",
    textAlign: "center",
  },
  signInLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Welcome;
