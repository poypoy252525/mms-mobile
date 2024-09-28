import { View, Text } from "react-native";
import CustomButton from "../CustomButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { Burial, Death, Directions } from "@/constants/Entity";
import getDirectionFromCurrentPosition from "@/api/route";
import { useStore } from "@/app/stores/store";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";
import { Button } from "react-native-paper";

interface Props {
  death: Death;
  burial?: Burial;
  currentLocation?: { latitude: number; longitude: number };
  bottomSheetRef?: BottomSheet;
}

const FirstScene = ({
  burial,
  death,
  bottomSheetRef,
  currentLocation,
}: Props) => {
  const setDirections = useStore((state) => state.setDirections);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const setCameraCoordinate = useStore((state) => state.setCameraCoordinate);
  const [isLoading, setLoading] = useState<boolean>();
  const destination = useStore((state) => state.destination);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { granted } = await getForegroundPermissionsAsync();
      if (granted) {
        const currentLocation = await getCurrentPositionAsync();
        setCurrentLocation(currentLocation.coords);
      }
    };
    getCurrentLocation();
  }, []);
  const info = [
    {
      label: "Age",
      value: death.age,
    },
    {
      label: "Date of birth",
      value: new Date(death.dateOfBirth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: "Date of death",
      value: new Date(death.dateOfDeath).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: "Next of kin name",
      value: death.nextOfKinName,
    },
    {
      label: "Next of kin relationship",
      value: death.nextOfKinRelationship,
    },
  ];
  return (
    <View>
      <Text
        style={{ fontSize: 24 }}
      >{`${death.firstName} ${death.lastName}`}</Text>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Text style={{ opacity: 0.5 }}>{death.status}</Text>
        <Text
          style={{ opacity: 0.5 }}
        >{`${burial?.block}-${burial?.row}${burial?.plotNumber}`}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {/* <CustomButton
          style={{ marginTop: 16 }}
          onPress={async () => {
            if (currentLocation && destination) {
              setLoading(true);
              const directions =
                await getDirectionFromCurrentPosition<Directions>(
                  currentLocation?.latitude,
                  currentLocation?.longitude,
                  destination[1],
                  destination[0]
                );
              if (directions) setDirections(directions);
              setLoading(false);
              setCameraCoordinate([
                currentLocation.longitude,
                currentLocation.latitude,
              ]);
              directions && bottomSheetRef?.collapse();
            }
          }}
          title="Directions"
          icon={<FontAwesome5 name="directions" size={22} color="white" />}
          isLoading={isLoading}
        /> */}
        <Button
          icon="directions"
          mode="contained"
          style={{ width: "100%", marginBottom: 24, marginTop: 16 }}
          onPress={async () => {
            if (currentLocation && destination) {
              setLoading(true);
              const directions =
                await getDirectionFromCurrentPosition<Directions>(
                  currentLocation?.latitude,
                  currentLocation?.longitude,
                  destination[1],
                  destination[0]
                );
              if (directions) setDirections(directions);
              setLoading(false);
              setCameraCoordinate([
                currentLocation.longitude,
                currentLocation.latitude,
              ]);
              directions && bottomSheetRef?.collapse();
            }
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          Directions
        </Button>
      </View>
      <View style={styles.subContent}>
        {info.map((item, index) => (
          <React.Fragment key={index}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                gap: 16,
              }}
            >
              <Text numberOfLines={1} style={{ color: "#858585", flex: 1 }}>
                {item.label}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: "#333333", fontWeight: "500" }}
              >
                {item.value}
              </Text>
            </View>
            {index < info.length - 1 && (
              <View
                style={{ width: "100%", height: 1, backgroundColor: "white" }}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContent: {
    backgroundColor: "#F6F8FA",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
});

export default FirstScene;
