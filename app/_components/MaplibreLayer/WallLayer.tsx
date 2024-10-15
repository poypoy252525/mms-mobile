import walls from "@/geojson/walls.json";
import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";

const WallLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="wallSource"
      shape={walls as GeoJSON.FeatureCollection}
    >
      <Maplibre.FillExtrusionLayer
        id="wallLayer"
        style={{
          fillExtrusionBase: 0,
          fillExtrusionHeight: 5,
          fillExtrusionColor: "#fc8686",
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default WallLayer;
