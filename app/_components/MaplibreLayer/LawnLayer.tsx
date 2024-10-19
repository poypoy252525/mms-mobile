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
          fillOutlineColor: "gray",
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default LawnLayer;
