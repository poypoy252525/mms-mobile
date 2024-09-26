import building from "@/constants/buildings.json";
import routesRoad from "@/constants/routes.json";
import MapLibreGL from "@maplibre/maplibre-react-native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useStore } from "../stores/store";

MapLibreGL.setAccessToken(null);

const apiKey = "7d1e7cd9-770c-4ae4-b4f9-895c8171210e";
const styleUrl = `https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=${apiKey}`;

interface Props {
  markPoint?: number[];
}

const Map = ({ markPoint }: Props) => {
  const directions = useStore((state) => state.directions);
  return (
    <MapLibreGL.MapView
      style={styles.map}
      pitchEnabled={true}
      logoEnabled={false}
      compassEnabled
      compassViewPosition={2}
      styleURL={styleUrl}
    >
      <MapLibreGL.UserLocation
        androidRenderMode="compass"
        renderMode="native"
        androidPreferredFramesPerSecond={30}
      />
      <MapLibreGL.Camera
        // maxBounds={{
        //   ne: [121.147396, 14.754447],
        //   sw: [121.145562, 14.753711],
        // }}
        pitch={60}
        centerCoordinate={[121.146484, 14.754098]}
        animationDuration={1000}
        minZoomLevel={17}
        followUserLocation={directions ? true : false}
      />
      {directions && (
        <MapLibreGL.ShapeSource
          id="directions"
          shape={{
            type: "LineString",
            coordinates: directions?.paths[0].points.coordinates,
          }}
        >
          <MapLibreGL.LineLayer
            id="directionLayer"
            style={{ lineWidth: 10, lineColor: "blue", lineOpacity: 0.7 }}
          />
        </MapLibreGL.ShapeSource>
      )}

      <MapLibreGL.ShapeSource
        id="routes"
        shape={routesRoad as GeoJSON.FeatureCollection}
      >
        <MapLibreGL.LineLayer
          id="routesLine"
          style={{ lineColor: "white", lineWidth: 20 }}
        />
      </MapLibreGL.ShapeSource>

      <MapLibreGL.ShapeSource
        id="buildings"
        shape={building as GeoJSON.FeatureCollection}
      >
        <MapLibreGL.FillExtrusionLayer
          id="buildingLayer"
          style={{
            fillExtrusionHeight: 2.5,
            fillExtrusionBase: 0,
            fillExtrusionColor: "#c3c3c3",
            fillExtrusionOpacity: 1,
          }}
        />
      </MapLibreGL.ShapeSource>
    </MapLibreGL.MapView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
});

export default Map;
