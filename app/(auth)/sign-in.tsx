import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
import React from "react";

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../_components/CustomButton";
import axios, { AxiosError } from "axios";
import { baseURL } from "@/constants/BaseURL";

const scopeBaseURL = "https://www.googleapis.com";

GoogleSignin.configure({
  webClientId:
    "574017815971-irdgco7gesi6t214h9i8dejgrd9ldn21.apps.googleusercontent.com",
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const { user } = response.data;
      try {
        const userData = await axios.post(`${baseURL}/api/users`, {
          googleId: user.id,
          email: user.email,
          firstName: user.givenName,
          lastName: user.familyName,
          photo: user.photo,
        });
        console.log(userData);
      } catch (error) {
        // if (error instanceof AxiosError) console.log(error.response?.data);
      }

      router.push("/(root)");
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
          console.log(error);
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};

const SignIn = () => {
  if (GoogleSignin.getCurrentUser()) return <Redirect href="/(root)" />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source="https://amateurphotographer.com/wp-content/uploads/sites/7/2012/12/Andrew_Sanderson_frosty_graves_main.jpg"
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "white"]}
            style={styles.imageGradient}
          />
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View style={styles.contentContainer}>
          <CustomButton
            icon={<AntDesign name="google" size={24} color="white" />}
            onPress={signIn}
            title="Sign in with Google"
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
    height: 300,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
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

export default SignIn;
