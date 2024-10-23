import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import getDirection from "@/api/route";
import { Directions } from "@/constants/Entity";
import { useStore } from "@/stores/store";

const DirectionButton = () => {
  const destination = useStore((state) => state.destination);
  const setDirections = useStore((state) => state.setDirections);
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);
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
          setLoading(true);
          const direction = await getDirection(
            currentLocation,
            destination,
            "foot"
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
        }
      }}
    >
      Directions
    </Button>
  );
};

export default DirectionButton;
