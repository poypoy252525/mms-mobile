import Marker from "@/assets/images/marker-pin.png";
import map from "@/constants/map.json";
import MapLibreGL from "@maplibre/maplibre-react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useStore } from "../../stores/store";

MapLibreGL.setAccessToken(null);

// const apiKey = "7d1e7cd9-770c-4ae4-b4f9-895c8171210e";
const styleUrl = `https://api.maptiler.com/maps/34a6b3c5-b4e5-4292-99ac-4431a8b1b7d3/style.json?key=AWxYqeit04pvjyks83vM`;

interface Props {
  markPoint?: number[];
}

const Map = ({ markPoint }: Props) => {
  const directions = useStore((state) => state.directions);
  const currentLocation = useStore((state) => state.currentLocation);
  const cameraCoordinate = useStore((state) => state.cameraCoordinate);
  const destination = useStore((state) => state.destination);
  const death = useStore((state) => state.death);

  useEffect(() => {}, []);

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
      {/* <MapLibreGL.Camera
        // centerCoordinate={cameraCoordinate}
        heading={directions?.paths[0].instructions[0].heading}
        animationDuration={1000}
        zoomLevel={18}
        pitch={60}
        minZoomLevel={17}
      /> */}
      {directions && (
        <MapLibreGL.ShapeSource
          id="directions"
          shape={{
            type: "LineString",
            coordinates: directions.paths[0].points.coordinates,
          }}
        >
          <MapLibreGL.LineLayer
            id="directionLayer"
            style={{
              lineWidth: 5,
              lineColor: "blue",
              lineOpacity: 0.7,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </MapLibreGL.ShapeSource>
      )}

      {/* <MapLibreGL.ShapeSource
        id="buildings"
        shape={map as GeoJSON.FeatureCollection}
      >
        <MapLibreGL.FillExtrusionLayer
          id="buildingLayer"
          style={{
            fillExtrusionHeight: 0,
            fillExtrusionBase: 0,
            fillExtrusionColor: "#c3c3c3",
            fillExtrusionOpacity: 1,
          }}
        />
      </MapLibreGL.ShapeSource> */}
      {destination && (
        <MapLibreGL.ShapeSource
          id="pinSource"
          shape={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  title: "mark",
                },
                geometry: {
                  type: "Point",
                  coordinates: destination,
                },
              },
            ],
          }}
          onPress={() => console.log("marker pressed")}
        >
          <MapLibreGL.SymbolLayer
            id="markerSymbol"
            style={{
              iconImage: Marker, // You can set a custom icon
              iconSize: 0.05, // Adjust the size of the icon
              iconAnchor: "bottom",
              iconAllowOverlap: true,
            }}
          />
        </MapLibreGL.ShapeSource>
      )}
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
