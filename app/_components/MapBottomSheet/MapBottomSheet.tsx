import { baseURL } from "@/constants/BaseURL";
import { useStore } from "@/stores/store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";

const MapBottomSheet = () => {
  const [deceased, setDeceased] = useState<Deceased>();
  const setSelectedDeceased = useStore((state) => state.setSelectedDeath);
  const setDestination = useStore((state) => state.setDestination);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const death = useStore((state) => state.death);

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        if (!death) return;
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
      }
    };

    fetchDeceased();
  }, []);

  const handleClose = () => {
    setSelectedDeceased(undefined);
    setDestination(undefined);
  };

  return (
    <BottomSheet
      enablePanDownToClose
      ref={bottomSheetRef}
      onClose={handleClose}
      animateOnMount
      index={1}
      snapPoints={["10%", "40%", "100%"]}
      style={styles.bottomSheet}
      handleIndicatorStyle={{ backgroundColor: "lightgray" }}
    >
      <BottomSheetView style={{ paddingHorizontal: 12, rowGap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ fontSize: 24 }}>{deceased?.name}</Text>
        </View>
        <Button mode="contained" icon="directions" onPress={() => {}}>
          Directions
        </Button>
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
});

export default MapBottomSheet;
