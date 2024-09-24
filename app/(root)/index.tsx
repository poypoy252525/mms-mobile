import { baseURL } from "@/constants/BaseURL";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Skeleton, SkeletonContainer } from "@nlazzos/react-native-skeleton";
import { Death } from "@prisma/client";
import axios from "axios";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputWithIcon from "../_components/CustomInputWithIcon";
import DeathCard from "../_components/DeathCard";
import { useUserStore } from "../stores/store";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { Visit } from "@/types/visit";

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
        const { data } = await axios.get(
          "https://api.openrouteservice.org/v2/directions/foot-walking",
          {
            params: {
              api_key:
                "5b3ce3597851110001cf6248deabef0b545a43fab6b247d0bfc3325c",
              start: `${currentLocation?.longitude},${currentLocation?.latitude}`,
              end: `${destination.longitude},${destination.latitude}`,
            },
          }
        );
        const coordinates = data.features[0].geometry.coordinates.map(
          ([lng, lat]: [number, number]) => ({
            latitude: lat,
            longitude: lng,
          })
        );
        setRoute(coordinates);
      } catch (error) {
        // console.error("Error fetching directions:", error);
      }
    };

    getDirections();
  }, [currentLocation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome {user.givenName}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomInputWithIcon
              placeholder="Where do you want to go?"
              icon={<Ionicons name="search" size={24} color="gray" />}
              style={{ backgroundColor: "white" }}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ display: "flex", gap: 24 }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={styles.sectionLabel}>Your current location</Text>
              <View style={styles.mapContainer}>
                {!isLoading && currentLocation ? (
                  <MapView
                    style={styles.map}
                    provider="google"
                    showsUserLocation
                    region={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                      longitudeDelta: 0.005,
                      latitudeDelta: 0.005,
                    }}
                    mapType="standard"
                    minZoomLevel={15}
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
    </SafeAreaView>
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
