import Marker from "@/assets/images/marker-pin.png";
import MapLibreGL from "@maplibre/maplibre-react-native";
import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useStore } from "../../stores/store";
import DirectionLayer from "./MaplibreLayer/DirectionLayer";
import ResidentialRouteLayer from "./MaplibreLayer/ResidentialRouteLayer";
import LawnLayer from "./MaplibreLayer/LawnLayer";
import BuildingLayer from "./MaplibreLayer/BuildingLayer";
import ApartmentLayer from "./MaplibreLayer/ApartmentLayer";
import ColumbaryLayer from "./MaplibreLayer/ColumbaryLayer";
import WallLayer from "./MaplibreLayer/WallLayer";

MapLibreGL.setAccessToken(null);

// const apiKey = "7d1e7cd9-770c-4ae4-b4f9-895c8171210e";
const styleUrl = `https://api.maptiler.com/maps/608de5e8-9e8f-4899-b8ed-b319ac0ce0a4/style.json?key=AWxYqeit04pvjyks83vM`;

interface Props {
  markPoint?: number[];
}

const Map = ({ markPoint }: Props) => {
  const setDestination = useStore((state) => state.setDestination);
  const setDirections = useStore((state) => state.setDirections);
  const currentLocation = useStore((state) => state.currentLocation);
  const destination = useStore((state) => state.destination);
  const mapRef = useRef<MapLibreGL.MapViewRef>(null);
  const [profile, setProfile] = useState<string>("foot");

  useEffect(() => {
    setDestination([121.145671, 14.732251]);
  }, []);

  useEffect(() => {
    (async () => {
      if (!destination) return;
      try {
        const { data } = await axios.post(
          `https://graphhopper-fx1s.onrender.com/route`,
          JSON.stringify({
            profile: "foot",
            points: [
              [currentLocation?.longitude, currentLocation?.latitude],
              destination,
            ],
            points_encoded: false,
          }),
          {
            headers: {
              "Content-Type": `application/json`,
            },
            params: {
              key: "",
            },
          }
        );
        console.log(data);
        setDirections(data);
      } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        console.error("error getting direction: ", error);
        throw error;
      }
    })();
  }, [destination]);

  return (
    <MapLibreGL.MapView
      ref={mapRef}
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
        centerCoordinate={
          currentLocation && [
            currentLocation.longitude,
            currentLocation.latitude,
          ]
        }
        animationDuration={1000}
        zoomLevel={18}
        pitch={60}
        minZoomLevel={17}
      /> */}
      <ResidentialRouteLayer />
      <LawnLayer />
      <DirectionLayer />
      <BuildingLayer />
      <ApartmentLayer />
      <ColumbaryLayer />
      <WallLayer />

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
