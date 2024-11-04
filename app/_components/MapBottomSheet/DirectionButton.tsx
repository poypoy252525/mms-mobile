import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import getDirection from "@/api/route";
import { Directions } from "@/constants/Entity";
import { useStore } from "@/stores/store";
import { isOutsideOfArea } from "@/functions/functions";
import { staticLocation } from "@/constants/EntryLocation";
import { getCurrentPositionAsync } from "expo-location";

const DirectionButton = ({ callback }: { callback?: () => void }) => {
  const destination = useStore((state) => state.destination);
  const setDirections = useStore((state) => state.setDirections);
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const currentLocation = useStore((state) => state.currentLocation);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Button
      mode="contained"
      icon="directions"
      loading={loading}
      disabled={loading}
      onPress={async () => {
        try {
          if (!currentLocation || !destination) return;
          console.log("current location: ", currentLocation);
          setLoading(true);
          const isOutside = await isOutsideOfArea();
          const actualLocation = await getCurrentPositionAsync();
          setCurrentLocation(
            isOutside ? staticLocation : actualLocation.coords
          );
          const direction = await getDirection(
            currentLocation,
            destination,
            "car"
          );
          setDirections(direction as Directions);
          setCameraCoordinate([
            currentLocation.longitude,
            currentLocation.latitude,
          ]);
        } catch (error) {
          console.error("failed to get direction: ", error);
          throw error;
        } finally {
          setLoading(false);
          callback && callback();
        }
      }}
    >
      Directions
    </Button>
  );
};

export default DirectionButton;
