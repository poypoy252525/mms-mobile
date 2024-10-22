import BurialTypeCard from "@/app/_components/BurialTypeCard";
import { Href, router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const burialType = [
  {
    title: "Lawn Lot",
    image: require("@/assets/images/lawn.png"),
    path: "/(root)/discover/LAWN_LOT" as Href,
  },
  {
    title: "Family Lot",
    image: require("@/assets/images/family.png"),
    path: "/(root)/discover/FAMILY_LOT" as Href,
  },
  {
    title: "Apartment Lot",
    image: require("@/assets/images/apartment.png"),
    path: "/(root)/discover/APARTMENT" as Href,
  },
  {
    title: "Columbary Lot",
    image: require("@/assets/images/columbarium.png"),
    path: "/(root)/discover/COLUMBARIUM" as Href,
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
