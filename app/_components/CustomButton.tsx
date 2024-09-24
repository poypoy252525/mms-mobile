import {
  View,
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";

interface Props {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  icon?: ReactNode;
}

const CustomButton = ({ onPress, title, style, icon }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#006cd0" : "#0286FF" },
        style,
      ]}
      onPress={() => onPress()}
    >
      {icon}
      <Text style={{ color: "white", fontWeight: "600", marginLeft: 14 }}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    borderRadius: 100,
    marginBottom: 32,
  },
});

export default CustomButton;
