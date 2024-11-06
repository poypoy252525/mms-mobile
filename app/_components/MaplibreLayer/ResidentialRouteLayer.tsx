import Maplibre from "@maplibre/maplibre-react-native";
import React from "react";
import residentialRoutes from "@/geojson/residential_routes.json";

const ResidentialRouteLayer = () => {
  return (
    <Maplibre.ShapeSource
      id="residentialRouteSource"
      shape={residentialRoutes as GeoJSON.FeatureCollection}
    >
      <Maplibre.LineLayer
        id="residentialRouteStrokeLayer"
        style={{
          lineColor: "#c3c3c3",
          lineWidth: 6,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      <Maplibre.LineLayer
        id="residentialRouteLayer"
        style={{
          lineColor: "white",
          lineWidth: 4,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      {/* <Maplibre.SymbolLayer
        id="routeSymbolLayer"
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

export default ResidentialRouteLayer;
