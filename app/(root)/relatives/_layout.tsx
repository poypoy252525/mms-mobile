import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ animation: "ios", headerShown: true }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
    </Stack>
  );
};

export default Layout;
