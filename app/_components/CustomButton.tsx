import {
  View,
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
} from "react-native";
import React from "react";

interface Props {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

const CustomButton = ({ onPress, title, style }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#006cd0" : "#0286FF" },
        style,
      ]}
      onPress={() => onPress()}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
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
