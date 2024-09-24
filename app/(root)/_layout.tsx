import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import CustomInputWithIcon from "../_components/CustomInputWithIcon";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarLabel: () => null,
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Gravestone GPS",
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
        name="discover"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                paddingVertical: 8,
                width: "100%",
              }}
            >
              <CustomInputWithIcon
                icon={<Ionicons name="search-outline" />}
                placeholder="Search for..."
                style={{
                  flex: 1,
                  borderRadius: 10,
                  width: "100%",
                  borderWidth: 0,
                }}
              />
            </View>
          ),
          headerTitleContainerStyle: { flex: 1, width: "100%" },
          headerLeftContainerStyle: { display: "none" },
          headerRightContainerStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Create request",
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
        name="notification"
        options={{
          title: "Notification",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
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
          headerTitleStyle: { fontSize: 18 },
          headerRight: ({}) => (
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={async () => {
                await GoogleSignin.signOut();
                router.push("/(auth)/sign-in");
              }}
            >
              <Text style={{ fontWeight: 500 }}>Logout</Text>
            </TouchableOpacity>
          ),
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
