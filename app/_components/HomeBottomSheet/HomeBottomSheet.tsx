import getDirectionFromCurrentPosition from "@/api/route";
import { Burial, Death, Directions, Instruction } from "@/constants/Entity";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../../stores/store";
import CustomButton from "../CustomButton";
import Feather from "@expo/vector-icons/Feather";
import FirstScene from "./FirstScene";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  death: Death;
}

const HomeBottomSheet = ({ death }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["12%", "44%", "80%"], []);
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
                <MaterialIcons name="turn-left" size={24} color="black" />
              ) : instruction.sign === 2 ? (
                <MaterialIcons name="turn-right" size={24} color="black" />
              ) : instruction.sign === 0 ? (
                <MaterialIcons name="location-pin" size={24} color="black" />
              ) : instruction.sign === -1 ? (
                <MaterialIcons
                  name="turn-slight-left"
                  size={24}
                  color="black"
                />
              ) : instruction.sign === 1 ? (
                <MaterialIcons
                  name="turn-slight-right"
                  size={24}
                  color="black"
                />
              ) : instruction.sign === -3 ? (
                <MaterialIcons name="turn-sharp-left" size={24} color="black" />
              ) : instruction.sign === 3 ? (
                <MaterialIcons
                  name="turn-sharp-right"
                  size={24}
                  color="black"
                />
              ) : instruction.sign === -7 ? (
                <MaterialIcons name="arrow-back" size={24} color="black" />
              ) : instruction.sign === 7 ? (
                <MaterialIcons name="arrow-forward" size={24} color="black" />
              ) : instruction.sign === -8 ? (
                <MaterialIcons name="u-turn-left" size={24} color="black" />
              ) : instruction.sign === 5 ? (
                <MaterialIcons name="flag" size={24} color="black" />
              ) : (
                instruction.sign === 4 && (
                  <MaterialIcons name="flag" size={24} color="black" />
                )
              )}
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>{instruction.text}</Text>
              <Text style={{ opacity: 0.5, fontSize: 12 }}>{`${Math.round(
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
        {!directions ? (
          <FirstScene
            burial={burial}
            death={death}
            currentLocation={currentLocation}
          />
        ) : (
          <SecondScene />
        )}
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
});

export default HomeBottomSheet;
