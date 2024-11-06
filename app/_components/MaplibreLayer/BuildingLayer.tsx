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
          fillExtrusionHeight: 0,
          fillExtrusionColor: "#eeeee4",
        }}
      />
      <Maplibre.LineLayer
        id="buildingLineLayer"
        style={{ lineColor: "lightgray", lineWidth: 1, lineOpacity: 1 }}
      />
      {/* <Maplibre.SymbolLayer
        id="buildingSymbolLayer"
        style={{
          textField: ["get", "label"],
          textSize: 10,
          textColor: "white",
          textHaloColor: "black",
          textHaloWidth: 1,
        }}
      /> */}
    </Maplibre.ShapeSource>
  );
};

export default BuildingLayer;
