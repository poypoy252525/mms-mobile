import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, MD3LightTheme, MD3Theme } from "react-native-paper";

const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000",
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            animation: "ios",
            statusBarStyle: "dark",
            statusBarColor: "white",
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
