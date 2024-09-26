import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[deathId]" />
    </Stack>
  );
};

export default Layout;
