import { useStore } from "@/stores/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { router, Tabs } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const Layout = () => {
  const reset = useStore((state) => state.reset);
  return (
    <Tabs
      screenOptions={{
        tabBarLabel: () => null,
        tabBarActiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Gravestone GPS",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          headerTitleContainerStyle: { flex: 1, width: "100%" },
          headerLeftContainerStyle: { display: "none" },
          headerRightContainerStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: `${GoogleSignin.getCurrentUser()?.user.email}`,
          headerTitleStyle: { fontSize: 18, flexShrink: 1, flexGrow: 0 },
          headerRight: ({}) => (
            <Button
              mode="text"
              onPress={async () => {
                await GoogleSignin.signOut();
                reset();
                router.push("/(auth)/sign-in");
              }}
            >
              Logout
            </Button>
          ),
          headerRightContainerStyle: { flexShrink: 0, flexGrow: 1 },
          tabBarIcon: ({ color, focused, size }) =>
            GoogleSignin.getCurrentUser()?.user.photo ? (
              <Image
                source={GoogleSignin.getCurrentUser()?.user.photo}
                style={[
                  { width: size, height: size, borderRadius: 50 },
                  focused && { borderWidth: 1, borderColor: color },
                ]}
              />
            ) : (
              <View
                style={[
                  {
                    width: size,
                    height: size,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 50,

                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  focused && { borderColor: color, borderWidth: 1 },
                ]}
              >
                <Ionicons
                  name={"person"}
                  size={size}
                  color="#c3c3c3"
                  style={[
                    { position: "absolute", top: 0, left: 0 },
                    focused && { top: -1, left: -1 },
                  ]}
                />
              </View>
            ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
