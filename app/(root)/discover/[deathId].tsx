import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "@/app/_components/Map";
import { Death } from "@/constants/Entity";
import axios from "axios";
import { baseURL } from "@/constants/BaseURL";
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { deathId } = useLocalSearchParams();
  const [death, setDeath] = useState<Death>();
  useEffect(() => {
    const fetchDeath = async () => {
      try {
        const { data } = await axios.get<Death>(
          `${baseURL}/api/deaths/${deathId}`
        );
        setDeath(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeath();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Map />
        {death && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["10%", "50%", "80%"]}
            index={1}
            style={styles.bottomSheet}
          >
            <BottomSheetView style={styles.bottomSheetView}>
              <Text
                style={{ fontSize: 24 }}
              >{`${death?.firstName} ${death?.lastName}`}</Text>
            </BottomSheetView>
          </BottomSheet>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
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

export default Home;
