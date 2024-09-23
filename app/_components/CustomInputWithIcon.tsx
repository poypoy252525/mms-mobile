import { View, Text, StyleSheet, TextInput, ViewStyle } from "react-native";
import React, { ReactNode, useState } from "react";

interface Props {
  icon: ReactNode;
  placeholder: string;
  style?: ViewStyle;
}

const CustomInputWithIcon = ({ icon, placeholder, style }: Props) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  return (
    <View style={[styles.textInputContainer, style]}>
      {icon}
      <TextInput
        placeholder={placeholder}
        style={[styles.textInput]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
    borderColor: "#E0E5EB",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 12,
    width: "100%",
    height: 48,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
  },
});

export default CustomInputWithIcon;
