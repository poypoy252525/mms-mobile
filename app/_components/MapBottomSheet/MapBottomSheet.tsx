import { baseURL } from "@/constants/BaseURL";
import { useMapBottomSheet } from "@/hooks/useMapBottomSheet";
import { useStore } from "@/stores/store";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import BottomSheetInfo from "./BottomSheetInfo";
import DirectionInstructionSheet from "./DirectionInstructionSheet";

const MapBottomSheet = () => {
  const [deceased, setDeceased] = useState<Deceased>();
  const direction = useStore((state) => state.directions);
  const setBottomSheetRef = useMapBottomSheet((state) => state.setRef);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const death = useStore((state) => state.death);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        if (!death) return;
        setLoading(true);
        const { idToken } = await GoogleSignin.getTokens();
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

  useEffect(() => {
    setBottomSheetRef(bottomSheetRef);
  }, [bottomSheetRef]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      animateOnMount
      index={1}
      snapPoints={["10%", "40%", "85%"]}
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
        <BottomSheetScrollView
          contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          {deceased && !direction && <BottomSheetInfo deceased={deceased} />}
          {direction && <DirectionInstructionSheet />}
        </BottomSheetScrollView>
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
