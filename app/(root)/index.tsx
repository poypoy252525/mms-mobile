import { baseURL } from "@/constants/BaseURL";
import { Visit } from "@/types/visit";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios, { AxiosError } from "axios";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Camera,
} from "react-native-maps";
import DeathCard from "../_components/DeathCard";

const Home = () => {
  const [visits, setVisits] = useState<Visit[]>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [route, setRoute] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user } = GoogleSignin.getCurrentUser()!;
  const mapRef = useRef<MapView>(null);
  const fetchRecentVisits = async () => {
    try {
      const { data: visits } = await axios.get<Visit[]>(
        `${baseURL}/api/visits/${user.id}`
      );
      setVisits(visits);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRecentVisits();
  }, []);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        setLoading(true);
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied.");
          return;
        }
        let currentLocation = await getCurrentPositionAsync({});
        setCurrentLocation({
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCurrentLocation();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecentVisits();
    setRefreshing(false);
  };

  const destination = {
    latitude: 14.754089825507837,
    longitude: 121.14644779754067,
  };

  useEffect(() => {
    const getDirections = async () => {
      try {
        const query = new URLSearchParams();
        query.append("profile", "foot");
        query.append("points_encoded", "false");
        query.append("key", "c7a05e01-fffd-4ec1-bdd5-b623c5fd2058");
        query.append(
          "point",
          `${destination.latitude},${destination.longitude}`
        );
        query.append(
          "point",
          `${currentLocation?.latitude},${currentLocation?.longitude}`
        );
        const { data } = await axios.get(
          `https://graphhopper.com/api/1/route?${query}`
        );
        const coordinates = data.paths[0].points.coordinates.map(
          ([lng, lat]: [number, number]) => ({ longitude: lng, latitude: lat })
        );
        setRoute(coordinates);
      } catch (error) {
        // console.error("Error fetching directions:", error.message);
      }
    };

    getDirections();
  }, [currentLocation]);

  useEffect(() => {
    if (mapRef.current)
      mapRef.current.animateCamera(
        {
          center: {
            latitude: 14.753892,
            longitude: 121.147094,
          },
          pitch: 45, // Tilt the map to 45 degrees
          heading: 0, // Direction facing
          altitude: 1000, // Zoom level
          zoom: 10,
        },
        { duration: 10 }
      );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderColor: "#e9e9e9",
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Gravestone GPS</Text>
          </View>
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ display: "flex", gap: 24 }}>
            <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
              <Text style={styles.sectionLabel}>Your current location</Text>
              <View style={styles.mapContainer}>
                {!isLoading && currentLocation ? (
                  <MapView
                    style={styles.map}
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    region={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                      longitudeDelta: 0.005,
                      latitudeDelta: 0.005,
                    }}
                    showsBuildings
                    minZoomLevel={15}
                    onMapReady={() => {
                      if (mapRef.current)
                        mapRef.current.animateCamera(
                          {
                            center: {
                              latitude: 14.753892,
                              longitude: 121.147094,
                            },
                            pitch: 45, // Tilt the map to 45 degrees
                            heading: 0, // Direction facing
                            altitude: 1000, // Zoom level
                            zoom: 10,
                          },
                          { duration: 10 }
                        );
                    }}
                  >
                    <Marker
                      coordinate={destination}
                      title="San Isidro Cemetery"
                    />
                    {route.length > 0 && (
                      <Polyline
                        coordinates={route}
                        strokeWidth={4}
                        strokeColor="blue"
                      />
                    )}
                  </MapView>
                ) : (
                  <View
                    style={[
                      styles.map,
                      {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.sectionLabel, { paddingHorizontal: 16 }]}>
                Recent visits
              </Text>
              <ScrollView
                style={{ flex: 1 }}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {isLoading || refreshing ? (
                  <View
                    style={{
                      width: Dimensions.get("screen").width,
                      marginTop: 32,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <View
                    style={{
                      gap: 16,
                      flex: 1,
                      flexDirection: "row",
                      paddingHorizontal: 16,
                    }}
                  >
                    {visits?.length ? (
                      visits?.map(({ death }) => (
                        <DeathCard death={death} key={death.id} />
                      ))
                    ) : (
                      <Text>No visits.</Text>
                    )}
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  titleContainer: {
    display: "flex",
    height: 60,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 300,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  deathCardSkeleton: { width: 300, height: 320, borderRadius: 20 },
});

export default Home;
