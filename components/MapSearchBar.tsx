import { baseURL } from "@/constants/BaseURL";
import { useMapBottomSheet } from "@/hooks/useMapBottomSheet";
import { useStore } from "@/stores/store";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import debounce from "debounce";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ActivityIndicator, IconButton, List } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const MapSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const [searchData, setSearchData] = useState<Deceased[]>();
  const [refreshing, setRefreshing] = useState(false);

  const setDestination = useStore((state) => state.setDestination);
  const setSelectedDeceased = useStore((state) => state.setSelectedDeath);
  const selectedDeceased = useStore((state) => state.death);
  const setDirection = useStore((state) => state.setDirections);
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);
  const currentLocation = useStore((state) => state.currentLocation);

  const panelHeight = useSharedValue(0);
  const panelOpacity = useSharedValue(0);
  const top = useSharedValue(24);
  const backButtonTop = useSharedValue(-100);

  const bottomSheetRef = useMapBottomSheet((state) => state.ref);

  const duration = 300;

  const handleSearch = async (text: string) => {
    try {
      setSearchData([]);
      setLoading(true);
      await GoogleSignin.signInSilently();
      const { idToken } = await GoogleSignin.getTokens();
      const { data } = await axios.get(`${baseURL}/api/deceased`, {
        params: {
          search: text,
        },
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (text) setSearchData(data);
      else setSearchData([]);
    } catch (error) {
      console.error("something is wrong while typing: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    if (selectedDeceased) {
      top.value = withTiming(-100, { duration });
      backButtonTop.value = withTiming(24, { duration });
    } else {
      top.value = withTiming(24, { duration });
      backButtonTop.value = withTiming(-100, { duration });
    }
  }, [selectedDeceased]);

  useEffect(() => {
    if (open) {
      panelHeight.value = withTiming(Dimensions.get("screen").height, {
        duration: duration,
      });
      panelOpacity.value = withTiming(1, { duration: duration });
    } else {
      setLoading(false);
      setValue("");
      Keyboard.dismiss();
      panelHeight.value = withTiming(0, { duration: duration });
      panelOpacity.value = withTiming(0, { duration: duration });
    }
  }, [open]);

  useEffect(() => {
    console.log(value);
    if (value) debouncedSearch(value);
    else {
      setSearchData([]);
    }
  }, [value, debouncedSearch]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: panelHeight.value,
    opacity: panelOpacity.value,
  }));

  const searchBarStyle = useAnimatedStyle(() => ({
    top: top.value,
  }));

  const handleRefresh = async () => {
    setRefreshing(true);
    await handleSearch(value);
    setRefreshing(false);
  };

  const handleSelect = async (deceased: Deceased) => {
    if (!deceased.burial) {
      console.log("Burial is undefined");
      return;
    }
    setDestination(deceased.burial.coordinates);
    setSelectedDeceased(deceased);
    setOpen(false);
  };

  const backButton = useAnimatedStyle(() => ({
    top: backButtonTop.value,
  }));

  const handleClose = () => {
    setSelectedDeceased(undefined);
    setDestination(undefined);
    setDirection(undefined);
    if (currentLocation)
      setCameraCoordinate([
        currentLocation?.longitude,
        currentLocation?.latitude,
      ]);
  };

  return (
    <>
      <Animated.View style={[styles.backButton, backButton]}>
        <View
          style={[
            { backgroundColor: "white", borderRadius: 100, elevation: 3 },
          ]}
        >
          <IconButton
            // mode="contained-tonal"
            size={20}
            icon="arrow-left"
            onPress={() => {
              handleClose();
              bottomSheetRef?.current?.close();
            }}
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.searchPanel, animatedStyle]}>
        <View style={{ height: 90 }} />
        {loading && (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
            <ActivityIndicator />
          </View>
        )}
        {!loading && open && value && (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
              />
            }
            contentContainerStyle={{ flex: 1 }}
            data={searchData}
            renderItem={({ item }) => (
              <List.Item
                right={() => <List.Icon icon="arrow-top-left" />}
                left={() => <List.Icon icon="map-marker-outline" />}
                style={{ paddingLeft: 24 }}
                title={item.name}
                onPress={() => handleSelect(item)}
              />
            )}
          />
        )}
      </Animated.View>
      <Animated.View style={[styles.searchBar, searchBarStyle]}>
        <View style={styles.searchContainer}>
          {open ? (
            <IconButton icon="arrow-left" onPress={() => setOpen(false)} />
          ) : (
            <IconButton icon="magnify" size={24} />
          )}

          <TextInput
            placeholder="Search here"
            style={styles.textInput}
            value={value}
            onFocus={() => setOpen(true)}
            onChangeText={(text) => setValue(text)}
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    elevation: 3,
    top: 24,
    position: "absolute",
    left: "5%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchPanel: {
    position: "absolute",
    top: 0,
    backgroundColor: "#fff",
    width: "100%",
    // paddingTop: 90,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  data: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 8,
    height: "auto",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
});

export default MapSearchBar;
