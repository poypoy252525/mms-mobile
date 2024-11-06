import React from "react";
import Maplibre from "@maplibre/maplibre-react-native";
import buildings from "@/geojson/buildings.json";
import apartment from "@/geojson/apartment.json";
import lawn from "@/geojson/lawn.json";
import columbary from "@/geojson/columbary.json";
import routes from "@/geojson/residential_routes.json";

const SymbolsLayer = () => {
  return (
    <>
      <Maplibre.ShapeSource
        id="buildingSymbolsSource"
        shape={buildings as GeoJSON.FeatureCollection}
      >
        <Maplibre.SymbolLayer
          id="buildingSymbolLayer"
          style={{
            textField: ["get", "label"],
            textSize: 10,
            textColor: "white",
            textHaloColor: "black",
            textHaloWidth: 1,
          }}
        />
      </Maplibre.ShapeSource>
      <Maplibre.ShapeSource
        id="apartmentSymbolsSource"
        shape={apartment as GeoJSON.FeatureCollection}
      >
        <Maplibre.SymbolLayer
          id="apartmentSymbolLayer"
          style={{
            textField: ["get", "label"],
            textSize: 10,
            textColor: "white",
            textHaloColor: "black",
            textHaloWidth: 1,
          }}
        />
      </Maplibre.ShapeSource>
      <Maplibre.ShapeSource
        id="lawnSymbolsSource"
        shape={lawn as GeoJSON.FeatureCollection}
      >
        <Maplibre.SymbolLayer
          id="lawnSymbolLayer"
          style={{
            textField: ["get", "label"],
            textSize: 10,
            textColor: "white",
            textHaloColor: "black",
            textHaloWidth: 1,
          }}
        />
      </Maplibre.ShapeSource>
      <Maplibre.ShapeSource
        id="columbarySymbolsSource"
        shape={columbary as GeoJSON.FeatureCollection}
      >
        <Maplibre.SymbolLayer
          id="columbarySymbolLayer"
          style={{
            textField: ["get", "label"],
            textSize: 10,
            textColor: "white",
            textHaloColor: "black",
            textHaloWidth: 1,
          }}
        />
      </Maplibre.ShapeSource>
      <Maplibre.ShapeSource
        id="routeSymbolsSource"
        shape={routes as GeoJSON.FeatureCollection}
      >
        <Maplibre.SymbolLayer
          id="routesSymbolLayer"
          style={{
            textField: ["get", "label"],
            textSize: 10,
            textColor: "white",
            textHaloColor: "black",
            textHaloWidth: 1,
          }}
        />
      </Maplibre.ShapeSource>
    </>
  );
};

export default SymbolsLayer;
