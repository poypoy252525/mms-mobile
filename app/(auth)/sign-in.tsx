import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({});

const SignIn = () => {
  return (
    <SafeAreaView>
      <Text>SignIn</Text>
    </SafeAreaView>
  );
};

export default SignIn;
