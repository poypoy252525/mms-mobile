import MapSearchBar from "@/components/MapSearchBar";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useStore } from "../../stores/store";
import Map from "../_components/Map";
import MapBottomSheet from "../_components/MapBottomSheet/MapBottomSheet";

const Home = () => {
  const death = useStore((state) => state.death);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const currentLocation = useStore((state) => state.currentLocation);
  const destination = useStore((state) => state.destination);
  const [isVisible, setVisible] = useState<boolean>();
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);

  useEffect(() => {
    (async () => {
      const { granted, status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      if (granted) {
        const currentLocation = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.Highest,
        });
        setCurrentLocation(currentLocation.coords);
        console.log(currentLocation.coords);
      }
    })();
  }, []);

  useEffect(() => {
    if (destination)
      setCameraCoordinate([destination.longitude, destination.latitude]);
    else if (currentLocation)
      setCameraCoordinate([
        currentLocation.longitude,
        currentLocation.latitude,
      ]);
  }, [destination, currentLocation]);

  useFocusEffect(
    useCallback(() => {
      // Resume rendering when tab is focused
      setVisible(true);

      return () => {
        // Pause rendering when tab is not focused
        setVisible(false);
      };
    }, [])
  );

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <View style={{ display: isVisible ? "flex" : "none", flex: 1 }}>
          <Map />
        </View>
        {death && isVisible && <MapBottomSheet />}
      </View>
      <MapSearchBar />
    </GestureHandlerRootView>
  );
};

export default Home;
