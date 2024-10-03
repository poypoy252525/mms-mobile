import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeBottomSheet from "../_components/HomeBottomSheet/HomeBottomSheet";
import Map from "../_components/Map";
import { useStore } from "../stores/store";

const Home = () => {
  const death = useStore((state) => state.death);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const currentLocation = useStore((state) => state.currentLocation);
  const destination = useStore((state) => state.destination);
  const [isVisible, setVisible] = useState<boolean>();
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);

  useEffect(() => {
    (async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentLocation = await getCurrentPositionAsync();
        setCurrentLocation(currentLocation.coords);
      }
    })();
  }, []);

  useEffect(() => {
    if (destination) setCameraCoordinate(destination);
    else if (currentLocation) setCameraCoordinate([121.14664999, 14.732473283]);
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

  if (!currentLocation) return <Text>Can not access location</Text>;

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <View style={{ flex: 1 }}>
          <View style={{ display: isVisible ? "flex" : "none", flex: 1 }}>
            <Map markPoint={destination} />
          </View>

          {death && isVisible && <HomeBottomSheet death={death} />}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
