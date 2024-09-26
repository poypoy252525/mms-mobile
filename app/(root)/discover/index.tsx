import { useStore } from "@/app/stores/store";
import { baseURL } from "@/constants/BaseURL";
import { Death } from "@/constants/Entity";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, Text } from "react-native";

const Discover = () => {
  const [deaths, setDeaths] = useState<Death[]>();
  const setSelectedDeath = useStore((state) => state.setSelectedDeath);
  useEffect(() => {
    const fetchDeaths = async () => {
      const searchParams = new URLSearchParams({
        include: JSON.stringify({
          burial: true,
        }),
      });
      const { data } = await axios.get<Death[]>(
        `${baseURL}/api/deaths?${searchParams}`
      );

      setDeaths(data);
    };
    fetchDeaths();
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {deaths?.map((death) => (
        <Pressable
          key={death.id}
          style={{ width: "100%", height: 32, justifyContent: "center" }}
          onPress={() => {
            router.navigate("/(root)");
            setSelectedDeath(death);
          }}
        >
          <Text key={death.id}>{`${death.firstName} ${death.lastName}`}</Text>
        </Pressable>
      ))}
    </KeyboardAvoidingView>
  );
};

export default Discover;
