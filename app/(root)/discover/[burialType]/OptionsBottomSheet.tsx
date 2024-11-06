import { View, Text } from "react-native";
import React from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { List } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const OptionsBottomSheet = ({ index }: { index: number }) => {
  return (
    <BottomSheet
      index={index}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetScrollView>
        <List.Item
          left={(props) => <List.Icon {...props} icon="plus" />}
          title="Add to list"
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default OptionsBottomSheet;
