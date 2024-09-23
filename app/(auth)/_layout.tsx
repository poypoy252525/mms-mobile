import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack screenOptions={{ animation: "ios" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
