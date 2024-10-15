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
          fillExtrusionHeight: 4.5,
        }}
      />
    </Maplibre.ShapeSource>
  );
};

export default ApartmentLayer;
