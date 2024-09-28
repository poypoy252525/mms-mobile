import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface Props {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  icon?: ReactNode;
  isLoading?: boolean;
}

const CustomButton = ({ onPress, title, style, icon, isLoading }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#006cd0" : "#0286FF" },
        style,
        isLoading && { opacity: 0.7 },
      ]}
      onPress={() => onPress()}
      disabled={isLoading}
    >
      {isLoading ? <ActivityIndicator color="white" /> : icon}
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
