import getDirectionFromCurrentPosition from "@/api/route";
import { Burial, Death, Directions, Instruction } from "@/constants/Entity";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../stores/store";
import CustomButton from "./CustomButton";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  death: Death;
}

const HomeBottomSheet = ({ death }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["12%", "50%", "80%"], []);
  const [burial, setBurial] = useState<Burial>();
  const currentLocation = useStore((state) => state.currentLocation);
  const setDirections = useStore((state) => state.setDirections);
  const directions = useStore((state) => state.directions);
  const [instructions, setInstructions] = useState<Instruction[]>();

  useEffect(() => {
    setBurial(death.burial);
  }, [death]);

  useEffect(() => {
    if (directions) setInstructions(directions.paths[0].instructions);
    else setInstructions(undefined);
  }, [death, directions]);

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

  const FirstScene = () => (
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
        <CustomButton
          style={{ marginTop: 16 }}
          onPress={async () => {
            if (currentLocation) {
              const directions =
                await getDirectionFromCurrentPosition<Directions>(
                  currentLocation?.latitude,
                  currentLocation?.longitude,
                  14.753982,
                  121.147119
                );
              if (directions) setDirections(directions);
              directions && bottomSheetRef.current?.collapse();
            }
          }}
          title="Directions"
          icon={<FontAwesome5 name="directions" size={22} color="white" />}
        />
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

  const SecondScene = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 24 }}>Walk</Text>
        <TouchableOpacity
          onPress={() => {
            setDirections(undefined);
          }}
        >
          <Text>close</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderLeftWidth: 5,
          borderLeftColor: "blue",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
        }}
      >
        <View>
          <Text style={{ fontSize: 24 }}>
            {`${Math.round(directions?.paths[0].time! / 1000 / 60)} minutes`}
          </Text>
          <Text style={{ opacity: 0.6 }}>{`${Math.round(
            directions?.paths[0].distance!
          )} meters`}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f0f0f0",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 50,
          }}
        >
          <Text>Mark as visited</Text>
        </TouchableOpacity>
      </View>
      <View>
        {instructions?.map((instruction, index) => (
          <View
            key={index}
            style={{
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ marginRight: 16 }}>
              {instruction.sign === -2 ? (
                <Feather name="corner-up-left" size={24} color="black" />
              ) : instruction.sign === 2 ? (
                <Feather name="corner-up-right" size={24} color="black" />
              ) : instruction.sign === 0 ? (
                <Feather name="map-pin" size={24} color="black" />
              ) : instruction.sign === -1 ? (
                <Feather name="arrow-up-left" size={24} color="black" />
              ) : instruction.sign === 1 ? (
                <Feather name="corner-up-left" size={24} color="black" />
              ) : (
                <Feather name="flag" size={24} color="black" />
              )}
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>{instruction.text}</Text>
              <Text style={{ opacity: 0.5 }}>{`${Math.round(
                instruction.distance
              )}m`}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.bottomSheet}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "#e5e5e5" }}
      index={1}
    >
      <BottomSheetScrollView style={styles.bottomSheetView}>
        {!directions ? <FirstScene /> : <SecondScene />}
      </BottomSheetScrollView>
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
  bottomSheetView: {
    paddingHorizontal: 16,
  },
  subContent: {
    backgroundColor: "#F6F8FA",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
});

export default HomeBottomSheet;
