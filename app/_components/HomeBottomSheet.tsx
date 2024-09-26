import { View, Text, Button } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Death } from "@/constants/Entity";
import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface Props {
  death: Death;
}

const HomeBottomSheet = ({ death }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["12%", "50%", "80%"], []);
  useEffect(() => {
    bottomSheetRef.current?.snapToPosition("50%");
  }, [death]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.bottomSheet}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "#e5e5e5" }}
      index={1}
    >
      <BottomSheetView style={styles.bottomSheetView}>
        <Text
          style={{ fontSize: 24 }}
        >{`${death.firstName} ${death.lastName}`}</Text>
        <Text style={{ opacity: 0.5 }}>{death.age}</Text>
        <View style={{ flexDirection: "row" }}>
          <CustomButton
            style={{ marginTop: 16 }}
            onPress={() => {}}
            title="Directions"
            icon={<FontAwesome5 name="directions" size={22} color="white" />}
          />
        </View>
      </BottomSheetView>
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
