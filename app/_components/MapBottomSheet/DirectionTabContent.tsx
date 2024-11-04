import { View, Text } from "react-native";
import React from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Directions } from "@/constants/Entity";
import { List } from "react-native-paper";

const DirectionTabContent = ({ direction }: { direction: Directions }) => {
  const { instructions, distance, time } = direction.paths[0];

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 22 }}>{`${Math.round(
          time / 1000 / 60
        )} min (${Math.round(distance)} m)`}</Text>
      </View>
      <List.Section>
        <List.Subheader>Steps</List.Subheader>
        {instructions.map((instruction, index) => (
          <List.Item
            key={index}
            style={{ paddingHorizontal: 20 }}
            left={() => <List.Icon icon={getIconBySign(instruction.sign)} />}
            title={instruction.text}
            description={`${Math.round(instruction.distance)} meters`}
            descriptionStyle={{ opacity: 0.7 }}
            onPress={() => {
              console.log(instruction);
            }}
          />
        ))}
      </List.Section>
    </BottomSheetScrollView>
  );
};

const getIconBySign = (sign: number): string => {
  let icon = "";
  switch (sign) {
    case -2:
      icon = "arrow-left-top";
      break;
    case 2:
      icon = "arrow-right-top";
      break;
    case 0:
      icon = "map-marker";
      break;
    case 5:
      icon = "flag";
      break;
    case 4:
      icon = "flag";
      break;
    default:
      icon = "map-marker-question-outline";
  }

  return icon;
};

export default DirectionTabContent;
