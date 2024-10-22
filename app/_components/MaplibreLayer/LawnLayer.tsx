import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";
import lawns from "@/geojson/lawn.json";

const LawnLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="lawnSource"
      shape={lawns as GeoJSON.FeatureCollection}
    >
      <Maplibre.FillLayer
        id="lawnLayer"
        style={{
          fillColor: "lightgreen",
        }}
      />
      <Maplibre.LineLayer
        id="lawnLineLayer"
        style={{
          lineColor: "black",
          lineWidth: 1,
          lineOpacity: 0.2,
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default LawnLayer;
