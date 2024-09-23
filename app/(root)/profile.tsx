import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const Profile = () => {
  const [id, setId] = useState<string>();
  return (
    <SafeAreaView>
      <Text>Profile screen</Text>
      <Button
        title="Click me"
        onPress={async () => {
          const { data: id } = await axios.post(
            "http://192.168.100.7:3000/api/visits/asdfjk",
            "Hello"
          );
          setId(id);
        }}
      />
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default Profile;
