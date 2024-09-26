import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import routes from "@/api/route";
import { StatusBar } from "expo-status-bar";
import building from "@/constants/buildings.json";
import routesRoad from "@/constants/routes.json";
import { router } from "expo-router";

// Quirky step required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null);

const apiKey = "7d1e7cd9-770c-4ae4-b4f9-895c8171210e";
const styleUrl = `https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=${apiKey}`;

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

const Home = () => {
  const [coordinates, setCoordinates] = useState<any>();
  useEffect(() => {
    const getDirection = async () => {
      try {
        const paths = await routes(
          14.753874,
          121.147166,
          14.754287,
          121.145643
        );
        if (paths) {
          const coordinates = paths[0].points.coordinates;
          setCoordinates(coordinates);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getDirection();
  }, []);
  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <MapLibreGL.MapView
        style={styles.map}
        pitchEnabled={true}
        logoEnabled={false}
        compassEnabled
        styleURL={styleUrl}
      >
        <MapLibreGL.UserLocation
          androidRenderMode="compass"
          renderMode="native"
          androidPreferredFramesPerSecond={30}
        />
        <MapLibreGL.Camera
          maxBounds={{
            ne: [121.147396, 14.754447],
            sw: [121.145562, 14.753711],
          }}
          centerCoordinate={[121.147082, 14.753925]} // Adjust this to center around your building
          zoomLevel={20}
          minZoomLevel={18}
          pitch={60}
          animationDuration={1000}
        />
        {coordinates && (
          <>
            <MapLibreGL.ShapeSource
              id="routes"
              shape={routesRoad as GeoJSON.FeatureCollection}
              onPress={() => router.navigate("/(root)/discover")}
            >
              <MapLibreGL.LineLayer
                id="routesLine"
                style={{ lineColor: "white", lineWidth: 20 }}
              />
            </MapLibreGL.ShapeSource>

            <MapLibreGL.ShapeSource
              id="polyline_routes"
              shape={{
                type: "LineString",
                coordinates,
              }}
            >
              <MapLibreGL.LineLayer
                id="routeLine"
                style={{
                  lineColor: "blue",
                  lineWidth: 10,
                  lineOpacity: 0.5,
                }}
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
                  fillExtrusionColor: "lightgray",
                  fillExtrusionOpacity: 1,
                }}
              />
            </MapLibreGL.ShapeSource>
          </>
        )}
      </MapLibreGL.MapView>
    </View>
  );
};

export default Home;
