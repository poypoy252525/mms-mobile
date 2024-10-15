import React from "react";
import Maplibre from "@maplibre/maplibre-react-native";
import buildings from "@/geojson/buildings.json";

const BuildingLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="buildingsSource"
      shape={buildings as GeoJSON.FeatureCollection}
    >
      <Maplibre.FillExtrusionLayer
        id="buildingLayer"
        style={{
          fillExtrusionBase: 0,
          fillExtrusionHeight: 3,
          fillExtrusionColor: "pink",
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default BuildingLayer;
