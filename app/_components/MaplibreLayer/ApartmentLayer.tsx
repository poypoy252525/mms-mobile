import apartments from "@/geojson/apartment.json";
import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";

const ApartmentLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="apartmentSource"
      shape={apartments as GeoJSON.FeatureCollection}
    >
      <Maplibre.FillExtrusionLayer
        id="apartmentLayer"
        style={{
          fillExtrusionBase: 0,
          fillExtrusionColor: "#e9e9e9",
          fillExtrusionHeight: 0,
        }}
      />
      <Maplibre.LineLayer
        id="apartmentLineLayer"
        style={{ lineWidth: 1, lineColor: "lightgray" }}
      />
      {/* <Maplibre.SymbolLayer
        id="apartmentSymbolLayer"
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

export default ApartmentLayer;
