import Marker from "@/assets/images/marker-pin.png";
import Maplibre from "@maplibre/maplibre-react-native";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { useStore } from "../../stores/store";
import ApartmentLayer from "./MaplibreLayer/ApartmentLayer";
import BuildingLayer from "./MaplibreLayer/BuildingLayer";
import Camera from "./MaplibreLayer/Camera";
import ColumbaryLayer from "./MaplibreLayer/ColumbaryLayer";
import DirectionLayer from "./MaplibreLayer/DirectionLayer";
import LawnLayer from "./MaplibreLayer/LawnLayer";
import ResidentialRouteLayer from "./MaplibreLayer/ResidentialRouteLayer";
import UserLocation from "./MaplibreLayer/UserLocation";
import SymbolsLayer from "./MaplibreLayer/SymbolsLayer";

Maplibre.setAccessToken(null);

// const apiKey = "7d1e7cd9-770c-4ae4-b4f9-895c8171210e";
const styleUrl = `https://api.maptiler.com/maps/608de5e8-9e8f-4899-b8ed-b319ac0ce0a4/style.json?key=AWxYqeit04pvjyks83vM`;

const Map = () => {
  const destination = useStore((state) => state.destination);
  const mapRef = useRef<Maplibre.MapViewRef>(null);

  return (
    <Maplibre.MapView
      ref={mapRef}
      style={styles.map}
      pitchEnabled={true}
      logoEnabled={false}
      compassEnabled
      compassViewPosition={2}
      styleURL={styleUrl}
      attributionEnabled={false}
    >
      <Camera />
      <ResidentialRouteLayer />
      <LawnLayer />
      <BuildingLayer />
      <ApartmentLayer />
      <ColumbaryLayer />
      <DirectionLayer />
      {/* <WallLayer /> */}

      {destination && (
        <Maplibre.ShapeSource
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
                  coordinates: [destination.longitude, destination.latitude],
                },
              },
            ],
          }}
          onPress={() => console.log("marker pressed")}
        >
          <Maplibre.SymbolLayer
            id="markerSymbol"
            style={{
              iconImage: Marker, // You can set a custom icon
              iconSize: 0.05, // Adjust the size of the icon
              iconAnchor: "bottom",
              iconAllowOverlap: true,
            }}
          />
        </Maplibre.ShapeSource>
      )}
      <UserLocation />
      <SymbolsLayer />
    </Maplibre.MapView>
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

// useEffect(() => {
//   setDestination([121.145671, 14.732251]);
// }, []);

// useEffect(() => {
//   if (!destination) return;
//   let locationSubscription: LocationSubscription;
//   let isMounted = true; // To track if the component is still mounted

//   (async () => {
//     const { status } = await requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.log("access denied");
//       return;
//     }

//     locationSubscription = await watchPositionAsync(
//       {
//         accuracy: Accuracy.Highest,
//         distanceInterval: 10,
//         timeInterval: 5000,
//       },
//       async (position) => {
//         if (!isMounted) return; // Ensure the component is still mounted before proceeding

//         const { latitude, longitude } = position.coords;
//         const currentLocation = { latitude, longitude };

//         if (!destination) {
//           setDestination([121.145671, 14.732251]);
//           return;
//         }

//         setCurrentLocation(currentLocation);

//         const directions = await getDirectionFromCurrentPosition<Directions>(
//           currentLocation,
//           { latitude: destination[1], longitude: destination[0] }, // Make sure these values are correct
//           "foot"
//         );
//         if (isMounted) setDirections(directions); // Set directions only if mounted
//       }
//     );
//   })();

//   // Cleanup on unmount
//   return () => {
//     isMounted = false; // Mark as unmounted
//     if (locationSubscription) locationSubscription.remove(); // Remove the subscription
//   };
// }, [destination]);
