import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native-paper";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, animation: "ios", title: "" }}>
      <Stack.Screen name="index" options={{ title: "Discover" }} />
    </Stack>
  );
};

export default Layout;
