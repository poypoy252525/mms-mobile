import React from "react";
import { View, Text } from "react-native";

import Map from "../_components/Map";
import { useStore } from "../stores/store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import HomeBottomSheet from "../_components/HomeBottomSheet";

// Quirky step required on Android. See Android installation notes.

const Home = () => {
  const death = useStore((state) => state.death);

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <Map markPoint={[121.146107, 14.754266]} />
        {death && <HomeBottomSheet death={death} />}
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
