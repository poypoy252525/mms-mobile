import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { List } from "react-native-paper";
import Animated, {
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import DirectionButton from "./DirectionButton";

const BottomSheetInfo = ({ deceased }: { deceased: Deceased }) => {
  const list: { label: string; icon: string }[] = [
    {
      label: `Block ${deceased?.burial?.block}`,
      icon: "toy-brick-marker-outline",
    },
    {
      label: `Lot ${deceased?.burial?.row}`,
      icon: "map-marker",
    },
    {
      label: `${deceased?.burial?.coordinates.latitude}, ${deceased?.burial?.coordinates.longitude}`,
      icon: "map-marker-outline",
    },
  ];

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      style={{
        rowGap: 12,
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
          paddingBottom: 12,
        }}
      >
        <Text style={{ fontSize: 24, marginLeft: 12 }}>{deceased?.name}</Text>
      </View>
      <DirectionButton />
      <View>
        <List.Section>
          <List.Subheader>Owner</List.Subheader>
          <List.Item
            style={{ paddingHorizontal: 24 }}
            left={() => <List.Icon icon="account" />}
            title={`${deceased?.burial?.owner.name}`}
            onPress={() => {}}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Burial info</List.Subheader>
          {list.map((item, index) => (
            <List.Item
              key={index}
              style={{ paddingHorizontal: 24 }}
              left={() => <List.Icon icon={item.icon} />}
              title={item.label}
              onPress={() => {}}
            />
          ))}
        </List.Section>
      </View>
    </Animated.View>
  );
};

export default BottomSheetInfo;
