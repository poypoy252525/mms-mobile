import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { View } from "react-native";

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarLabel: () => null }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
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
