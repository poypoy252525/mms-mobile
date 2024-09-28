import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

const Profile = () => {
  const summary = [
    { label: "Visits", value: 1 },
    { label: "Plans", value: 2 },
    { label: "Records", value: 0 },
  ];
  const { user } = GoogleSignin.getCurrentUser()!;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexShrink: 1, flexDirection: "row", margin: 24 }}>
        <View style={{}}>
          <Image
            source={user.photo}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              marginBottom: 6,
            }}
          />
          <Text
            style={{ fontSize: 12, fontWeight: 600 }}
          >{`${user.givenName} ${user.familyName}`}</Text>
        </View>

        {summary.map((item, index) => (
          <View
            key={index}
            style={{ flex: 1, alignItems: "center", marginTop: 4 }}
          >
            <Text style={{ fontWeight: 800, fontSize: 16 }}>{item.value}</Text>
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs
          style={{ backgroundColor: "white" }}
          theme={{ colors: { primary: "black" } }}
        >
          <TabScreen label="Visits">
            <VisitTab />
          </TabScreen>
          <TabScreen label="Plan to visit">
            <PlanToVisitTab />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
};

const VisitTab = () => (
  <View>
    <Text>No visits</Text>
  </View>
);

const PlanToVisitTab = () => (
  <View>
    <Text>Plan to visits</Text>
  </View>
);

export default Profile;
