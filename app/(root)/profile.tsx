import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../_components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const Profile = () => {
  return (
    <SafeAreaView>
      <CustomButton
        title="Logout"
        onPress={async () => {
          await GoogleSignin.signOut();
          router.push("/(auth)/sign-in");
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
