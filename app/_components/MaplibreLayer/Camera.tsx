import { useStore } from "@/stores/store";
import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";

const Camera = () => {
  const direction = useStore((state) => state.directions);
  const camera = useStore((state) => state.cameraCoordinate);

  return (
    <Maplibre.Camera
      centerCoordinate={camera}
      animationDuration={1000}
      zoomLevel={18}
      pitch={60}
      minZoomLevel={17}
      // followUserLocation
      // followHeading={heading}
      heading={direction?.paths[0].instructions[0].heading}
    />
  );
};

export default Camera;
