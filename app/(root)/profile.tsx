import { baseURL } from "@/constants/BaseURL";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { List } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

const Profile = () => {
  const { user } = GoogleSignin.getCurrentUser()!;
  const [count, setCount] = useState<number>(0);

  const summary = [
    { label: "Lists", value: count },
    { label: "Records", value: 0 },
  ];

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
          // mode="scrollable"
        >
          <TabScreen label="Lists">
            <RecordTab deceasedCount={(count) => setCount(count)} />
          </TabScreen>
          {/* <TabScreen label="Request">
            <RequestTab />
          </TabScreen> */}
        </Tabs>
      </TabsProvider>
    </View>
  );
};

const RecordTab = ({
  deceasedCount,
}: {
  deceasedCount: (count: number) => void;
}) => {
  const [deceased, setDeceased] = useState<Deceased[]>();
  const [refreshing, setRefreshing] = useState(false);
  const fetchDeceasedByUser = async () => {
    try {
      await GoogleSignin.signInSilently();
      const { user, idToken } = GoogleSignin.getCurrentUser()!;
      const { data } = await axios.get<Deceased[]>(
        `${baseURL}/api/users/${user.id}/deceased`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      setDeceased(data);
      deceasedCount(data.length);
    } catch (error) {
      console.error("error fetching user list of deceased: ", error);
    }
  };
  useEffect(() => {
    fetchDeceasedByUser();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDeceasedByUser();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={deceased}
      renderItem={({ item }) => <List.Item title={item.name} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const RequestTab = () => (
  <View>
    <Text>Requests</Text>
  </View>
);

export default Profile;
