import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarProps,
  Route,
} from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1 }}>
    <Text>Visits tab</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1 }}>
    <Text>Plan to visit</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = (props: TabBarProps<Route>) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "black", textTransform: "none" }}
  />
);

const Profile = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Visits" },
    { key: "second", title: "Plan to visits" },
  ]);
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
      <TabView
        style={{ flex: 1 }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Profile;
