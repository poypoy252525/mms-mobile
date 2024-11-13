import { baseURL } from "@/constants/BaseURL";
import { useListBottomSheet } from "@/hooks/useListBottomSheet";
import { useStore } from "@/stores/store";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { ActivityIndicator, Appbar, List, Snackbar } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

const Profile = () => {
  const { user } = GoogleSignin.getCurrentUser()!;
  const [count, setCount] = useState<number>(0);

  const summary = [
    { label: "Bookmarks", value: count },
    { label: "Plots", value: 0 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.Content
          titleStyle={{ fontSize: 18, fontWeight: "bold" }}
          title={user.email}
        />
        <Appbar.Action
          icon="logout"
          onPress={async () => {
            await GoogleSignin.signOut();
            router.replace("/sign-in");
          }}
        />
      </Appbar.Header>
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
          <TabScreen label="Bookmarks">
            <RecordTab deceasedCount={(count) => setCount(count)} />
          </TabScreen>
          <TabScreen label="Plots">
            <RequestTab />
          </TabScreen>
        </Tabs>
      </TabsProvider>
      <ListBottomSheet />
    </View>
  );
};

const RecordTab = ({
  deceasedCount,
}: {
  deceasedCount: (count: number) => void;
}) => {
  const [deceased, setDeceased] = useState<Deceased[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const setSelectedDeceased = useStore((state) => state.setSelectedDeath);
  const setDestination = useStore((state) => state.setDestination);
  const listBottomSheetRef = useListBottomSheet(
    (state) => state.bottomSheetRef
  );
  const setBottomSheetDeceased = useListBottomSheet(
    (state) => state.setDeceased
  );

  const fetchDeceasedByUser = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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

  const handlePress = (deceased: Deceased) => {
    if (!deceased.burial) {
      console.log("Burial is undefined");
      return;
    }
    setDestination(deceased.burial.coordinates);
    setSelectedDeceased(deceased);
    router.navigate(`/(root)`);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={deceased}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          onPress={() => handlePress(item)}
          onLongPress={() => {
            setBottomSheetDeceased(item);
            listBottomSheetRef?.current?.expand();
          }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={deceased.length === 0 ? { flex: 1 } : null}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? <ActivityIndicator /> : <Text>No bookmarks.</Text>}
        </View>
      )}
    />
  );
};

const RequestTab = () => {
  const items = Array.from({ length: 0 }, (_, index) => ({
    label: `Item ${index}`,
  }));
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <List.Item title={item.label} />}
      contentContainerStyle={items.length === 0 ? { flex: 1 } : null}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No plots.</Text>
        </View>
      }
    />
  );
};

const ListBottomSheet = () => {
  const options = [
    { label: "Remove from list", icon: "bookmark-remove-outline" },
  ];
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const setBottomSheetRef = useListBottomSheet(
    (state) => state.setBottomSheetRef
  );
  const deceased = useListBottomSheet((state) => state.deceased);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (bottomSheetRef) setBottomSheetRef(bottomSheetRef);
  }, [bottomSheetRef, bottomSheetRef.current]);

  const handlePress = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signInSilently();
      const { idToken, user } = GoogleSignin.getCurrentUser()!;
      await axios.delete(
        `${baseURL}/api/users/${user.id}/deceased/${deceased?.id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      bottomSheetRef.current?.close();
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error removing bookmark from list: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
        duration={2000}
      >
        Bookmark removed. Refresh to update list
      </Snackbar>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView>
          <FlatList
            data={options}
            renderItem={({ item }) =>
              loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <List.Item
                  title={item.label}
                  left={(props) => <List.Icon {...props} icon={item.icon} />}
                  onPress={() => handlePress()}
                />
              )
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default Profile;
