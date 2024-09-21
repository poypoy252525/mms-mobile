import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomInputWithIcon from "../_components/CustomInputWithIcon";
import CustomButton from "../_components/CustomButton";

const inputForm = [
  {
    label: "Name",
    placeholder: "Enter name",
    icon: <AntDesign name="user" size={20} color="gray" />,
  },
  {
    label: "Email",
    placeholder: "Enter email",
    icon: <Fontisto name="email" size={20} color="gray" />,
  },
  {
    label: "Password",
    placeholder: "Enter password",
    icon: <AntDesign name="lock" size={20} color="gray" />,
  },
];

const SignUp = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source="https://amateurphotographer.com/wp-content/uploads/sites/7/2012/12/Andrew_Sanderson_frosty_graves_main.jpg"
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "white"]}
            style={styles.imageGradient}
          />
          <Text style={styles.title}>Create an account</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ display: "flex", gap: 20 }}>
            {inputForm.map((input, index) => (
              <View key={index}>
                <Text style={styles.inputLabel}>{input.label}</Text>
                <CustomInputWithIcon
                  icon={input.icon}
                  placeholder={input.placeholder}
                />
              </View>
            ))}
          </View>

          <CustomButton
            title="Sign Up"
            onPress={() => console.log("first")}
            style={styles.signUpButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  imageContainer: {
    position: "relative",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    margin: 24,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 4,
  },
  signUpButton: {
    marginTop: 50,
  },
});

export default SignUp;
