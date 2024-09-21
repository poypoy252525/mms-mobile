import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import Illustration1 from "@/assets/images/map-illustration.png";
import Illustration2 from "@/assets/images/navigate-illustration.png";
import Illustration3 from "@/assets/images/connection-illustration.png";

const swiperPage = [
  {
    title: "The best tracker in your hands with Navigator",
    description:
      "Discover the convenience of tracking your loved one using navigation",
    image: Illustration1,
  },
  {
    title: "Preserving Memories, Connecting Lives",
    description: "Your Digital Gateway to Eternal Rest.",
    image: Illustration3,
  },
  {
    title: "Find your memories. Let's get started",
    description: "Navigate your memories in one click",
    image: Illustration2,
  },
];

const index = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = swiperPage.length - 1 === activeIndex;

  const swiperRef = useRef<Swiper>(null);
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slideContainer}>
          <Swiper
            loop={false}
            ref={swiperRef}
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {swiperPage.map((page, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  style={styles.image}
                  source={page.image}
                  contentFit="cover"
                />
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.description}>{page.description}</Text>
              </View>
            ))}
          </Swiper>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            { backgroundColor: pressed ? "#006cd0" : "#0286FF" },
          ]}
          onPress={() =>
            isLastSlide
              ? router.push("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        >
          <Text style={{ color: "white" }}>
            {isLastSlide ? "Get started" : "Next"}
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  skipContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  skip: { marginRight: 20, fontWeight: "bold" },
  nextButton: {
    display: "flex",
    width: "80%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    borderRadius: 100,
    marginBottom: 32,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  image: {
    width: "85%",
    height: 300,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
    marginBottom: 8,
  },
  description: {
    color: "#858585",
    textAlign: "center",
    width: "80%",
  },
});

export default index;
