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
          fillExtrusionHeight: 4.5,
          fillExtrusionColor: "#88cdcf",
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default ColumbaryLayer;
