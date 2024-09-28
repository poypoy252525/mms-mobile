import { useStore } from "@/app/stores/store";
import { baseURL } from "@/constants/BaseURL";
import { Death } from "@/constants/Entity";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";

const Discover = () => {
  const [deaths, setDeaths] = useState<Death[]>();
  const setSelectedDeath = useStore((state) => state.setSelectedDeath);
  const setDestination = useStore((state) => state.setDestination);
  const [isLoading, setLoading] = useState<boolean>();
  useEffect(() => {
    const fetchDeaths = async () => {
      setLoading(true);
      const searchParams = new URLSearchParams({
        include: JSON.stringify({
          burial: true,
        }),
      });
      const { data } = await axios.get<Death[]>(
        `${baseURL}/api/deaths?${searchParams}`
      );

      setDeaths(data);
      setLoading(false);
    };
    fetchDeaths();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        deaths?.map((death) => (
          <Pressable
            key={death.id}
            style={{
              width: "100%",
              height: 50,
              paddingHorizontal: 24,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
            }}
            onPress={() => {
              router.navigate("/(root)");
              setDestination([121.147187, 14.753852]);
              setSelectedDeath(death);
            }}
          >
            <Text key={death.id}>{`${death.firstName} ${death.lastName}`}</Text>
          </Pressable>
        ))
      )}
    </KeyboardAvoidingView>
  );
};

export default Discover;
