import getDirection from "@/api/route";
import { baseURL } from "@/constants/BaseURL";
import { Directions } from "@/constants/Entity";
import { useStore } from "@/stores/store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import DirectionButton from "./DirectionButton";

const MapBottomSheet = () => {
  const [deceased, setDeceased] = useState<Deceased>();
  const setSelectedDeceased = useStore((state) => state.setSelectedDeath);
  const setDestination = useStore((state) => state.setDestination);
  const setDirection = useStore((state) => state.setDirections);
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);
  const currentLocation = useStore((state) => state.currentLocation);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const death = useStore((state) => state.death);

  const [loading, setLoading] = useState<boolean>(false);

  const list: { label: string; icon: string }[] = [
    {
      label: `Block ${deceased?.burial?.block}`,
      icon: "toy-brick-marker-outline",
    },
    {
      label: `Lot ${deceased?.burial?.row}`,
      icon: "map-marker",
    },
    {
      label: `${deceased?.burial?.coordinates.join(", ")}`,
      icon: "map-marker-outline",
    },
  ];

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        if (!death) return;
        setLoading(true);
        await GoogleSignin.signInSilently();
        const { idToken } = GoogleSignin.getCurrentUser()!;
        const { data } = await axios.get(
          `${baseURL}/api/deceased/${death.id}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        setDeceased(data);
      } catch (error) {
        console.error(
          "Failed to fetch deceased from map bottom sheet: ",
          error
        );
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchDeceased();
  }, []);

  const handleClose = () => {
    setSelectedDeceased(undefined);
    setDestination(undefined);
    setDirection(undefined);
    if (currentLocation)
      setCameraCoordinate([
        currentLocation?.longitude,
        currentLocation?.latitude,
      ]);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={handleClose}
      animateOnMount
      index={1}
      snapPoints={["10.5%", "40%", "90%"]}
      style={styles.bottomSheet}
      handleIndicatorStyle={{ backgroundColor: "lightgray" }}
    >
      {loading ? (
        <BottomSheetView
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator style={{ marginTop: 24 }} />
        </BottomSheetView>
      ) : (
        <BottomSheetView style={{ paddingHorizontal: 12, rowGap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, marginLeft: 12 }}>
              {deceased?.name}
            </Text>
            <IconButton
              icon="close"
              size={16}
              onPress={() => bottomSheetRef.current?.close()}
              mode="contained"
            />
          </View>
          <DirectionButton />
          <View>
            <List.Section>
              <List.Subheader>Owner</List.Subheader>
              <List.Item
                style={{ paddingHorizontal: 24 }}
                left={() => <List.Icon icon="account" />}
                title={`${deceased?.owner?.name}`}
                onPress={() => {}}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>Burial info</List.Subheader>
              {list.map((item, index) => (
                <List.Item
                  key={index}
                  style={{ paddingHorizontal: 24 }}
                  left={() => <List.Icon icon={item.icon} />}
                  title={item.label}
                  onPress={() => {}}
                />
              ))}
            </List.Section>
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
  },
});

export default MapBottomSheet;
