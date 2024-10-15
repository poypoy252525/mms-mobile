import MapLibreGL from "@maplibre/maplibre-react-native";
import React from "react";
import residentialRoutes from "@/geojson/residential_routes.json";

const ResidentialRouteLayer = () => {
  return (
    <MapLibreGL.ShapeSource
      id="residentialRouteSource"
      shape={residentialRoutes as GeoJSON.FeatureCollection}
    >
      <MapLibreGL.LineLayer
        id="residentialRouteStrokeLayer"
        style={{
          lineColor: "#c3c3c3",
          lineWidth: 6,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      <MapLibreGL.LineLayer
        id="residentialRouteLayer"
        style={{
          lineColor: "white",
          lineWidth: 4,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </MapLibreGL.ShapeSource>
  );
};

export default ResidentialRouteLayer;
