import React, { useEffect } from "react";
import { View } from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeBottomSheet from "../_components/HomeBottomSheet";
import Map from "../_components/Map";
import { useStore } from "../stores/store";
import { destination } from "@/constants/destination";

// Quirky step required on Android. See Android installation notes.

const Home = () => {
  const death = useStore((state) => state.death);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location access denied");
        return;
      }

      let location = await getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <Map markPoint={destination} />
        {death && <HomeBottomSheet death={death} />}
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
