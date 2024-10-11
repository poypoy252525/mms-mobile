import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, animation: "ios" }}>
      <Stack.Screen name="index" options={{ title: "Discover" }} />
      <Stack.Screen name="lawn" options={{ title: "Lawn lot" }} />
      <Stack.Screen name="apartment" options={{ title: "Apartment lot" }} />
      <Stack.Screen name="family" options={{ title: "Family lot" }} />
      <Stack.Screen name="columbary" options={{ title: "Columbary lot" }} />
    </Stack>
  );
};

export default Layout;
