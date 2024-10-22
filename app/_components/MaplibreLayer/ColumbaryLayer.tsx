import columbaries from "@/geojson/columbary.json";
import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";

const ColumbaryLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="columbarySource"
      shape={columbaries as GeoJSON.FeatureCollection}
    >
      <Maplibre.FillExtrusionLayer
        id="columbaryLayer"
        style={{
          fillExtrusionBase: 0,
          fillExtrusionHeight: 0,
          fillExtrusionColor: "#88cdcf",
        }}
      />
      <Maplibre.LineLayer
        id="columbaryLineLayer"
        style={{ lineWidth: 1, lineColor: "black", lineOpacity: 0.2 }}
      />
    </Maplibre.ShapeSource>
  );
};

export default ColumbaryLayer;
