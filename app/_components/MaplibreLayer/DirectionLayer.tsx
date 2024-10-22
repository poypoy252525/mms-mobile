import { Directions } from "@/constants/Entity";
import { useStore } from "@/stores/store";
import MapLibreGL from "@maplibre/maplibre-react-native";
import React from "react";

const DirectionLayer = () => {
  const directions = useStore((state) => state.directions);
  return (
    directions && (
      <>
        <MapLibreGL.ShapeSource
          id="directionStrokeSource"
          shape={directions.paths[0].points}
        >
          <MapLibreGL.LineLayer
            id="directionStrokeLayer"
            style={{
              lineWidth: 5,
              lineColor: "blue",
              lineOpacity: 0.6,
              lineCap: "round",
              lineJoin: "round",
            }}
            // belowLayerID="buildingLayer"
          />
          <MapLibreGL.LineLayer
            id="directionLayer"
            style={{
              lineWidth: 3,
              lineColor: "white",
              lineOpacity: 0.6,
              lineCap: "round",
              lineJoin: "round",
            }}
            // belowLayerID="buildingLayer"
          />
        </MapLibreGL.ShapeSource>
      </>
    )
  );
};

export default DirectionLayer;
