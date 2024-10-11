import BurialTypeCard from "@/app/_components/BurialTypeCard";
import { baseURL } from "@/constants/BaseURL";
import { Death } from "@/constants/Entity";
import axios from "axios";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const burialType = [
  {
    title: "Lawn Lot",
    image: "https://picsum.photos/700",
    path: "/(root)/discover/lawn" as Href,
  },
  {
    title: "Family Lot",
    image: "https://picsum.photos/700",
    path: "/(root)/discover/family" as Href,
  },
  {
    title: "Apartment Lot",
    image: "https://picsum.photos/700",
    path: "/(root)/discover/apartment" as Href,
  },
  {
    title: "Columbary Lot",
    image: "https://picsum.photos/700",
    path: "/(root)/discover/columbary" as Href,
  },
];

const Discover = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <View style={{ width: "100%", gap: 12 }}>
            {burialType.map((burial, index) => (
              <BurialTypeCard
                key={index}
                description="This is the brief description about this burial type"
                image={burial.image}
                title={burial.title}
                onPress={() => router.navigate(burial.path)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Discover;
