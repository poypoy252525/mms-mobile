import { fetchDeceased } from "@/api/fetchDeceased";
import { useStore } from "@/stores/store";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, List, Text, Searchbar } from "react-native-paper";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

const getBurialTypeName = (burialType: string): string => {
  let name = "";
  switch (burialType) {
    case "APARTMENT":
      name = "Apartment";
      break;
    case "LAWN_LOT":
      name = "Lawn";
      break;
    case "FAMILY_LOT":
      name = "Family";
      break;
    case "COLUMBARIUM":
      name = "Columbarium";
      break;
  }
  return name;
};

const index = () => {
  const { burialType } = useLocalSearchParams();
  const navigation = useNavigation();
  const [deceased, setDeceased] =
    useState<(Deceased & { owner: Owner; burial: Burial })[]>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const setSelectedDeceased = useStore((state) => state.setSelectedDeath);
  const setDestination = useStore((state) => state.setDestination);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const deceased = await fetchDeceased(
          burialType as unknown as BurialType
        );
        setDeceased(deceased);
      } catch (error) {
        console.error("error fetching deceased: ", error);
        throw error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: getBurialTypeName(burialType as string),
    } as NativeStackNavigationOptions);
  }, [burialType, navigation]);

  const handlePress = (deceased: Deceased) => {
    if (!deceased.burial) {
      console.log("Burial is undefined");
      return;
    }
    setDestination(deceased.burial.coordinates);
    setSelectedDeceased(deceased);
    router.navigate(`/(root)`);
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const deceased = await fetchDeceased(burialType as unknown as BurialType);
      setDeceased(deceased);
    } catch (error) {
      console.error("failed to refresh deceased: ", error);
      throw error;
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
            />
          }
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No deceased record.</Text>
            </View>
          }
          data={deceased}
          renderItem={({ item }) => (
            <List.Item
              key={item.id}
              title={item.name}
              onPress={() => handlePress(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default index;
