import { View, Text } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";

const Create = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
      <Text>Create</Text>
      <Button mode="contained" onPress={() => {}}>
        Button
      </Button>
      <TextInput label="First name" mode="outlined" />
    </View>
  );
};

export default Create;
