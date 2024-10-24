import { View, Text } from "react-native";
import React from "react";
import Maplibre from "@maplibre/maplibre-react-native";

const UserLocation = () => {
  return (
    <Maplibre.UserLocation
      renderMode="normal"
      showsUserHeadingIndicator
      androidPreferredFramesPerSecond={30}
    />
  );
};

export default UserLocation;
