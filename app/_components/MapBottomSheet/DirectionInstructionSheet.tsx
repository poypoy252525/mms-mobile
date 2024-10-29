import getDirection from "@/api/route";
import { Directions } from "@/constants/Entity";
import { useStore } from "@/stores/store";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import DirectionTabContent from "./DirectionTabContent";

const DirectionInstructionSheet = () => {
  const [title, setTitle] = useState<string>("Drive");
  const [carDirection, setCarDirection] = useState<Directions>();
  const [footDirection, setFootDirection] = useState<Directions>();
  const [selectedDirection, setSelectedDirection] = useState<Directions>();

  const currentLocation = useStore((state) => state.currentLocation);
  const destination = useStore((state) => state.destination);
  const setDirections = useStore((state) => state.setDirections);

  useEffect(() => {
    const fetchDirection = async (
      type: "car" | "foot"
    ): Promise<Directions> => {
      try {
        const direction = await getDirection(
          currentLocation!,
          destination!,
          type
        );
        if (!direction) throw new Error("Error fetching direction");
        return direction;
      } catch (error) {
        console.error(`Error fetching ${type} direction: `, error);
        throw error;
      }
    };

    const initializeDirections = async () => {
      setCarDirection(await fetchDirection("car"));
      setFootDirection(await fetchDirection("foot"));
    };

    initializeDirections();
  }, []);

  useEffect(() => {
    if (selectedDirection) setDirections(selectedDirection);
  }, [selectedDirection]);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={{ flex: 1 }}
    >
      <Header title={title} />
      <TabsProvider defaultIndex={0}>
        <Tabs
          style={{
            backgroundColor: "white",
          }}
          tabHeaderStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "lightgray",
          }}
        >
          <TabScreen
            label="Drive"
            onPress={() => {
              setTitle("Drive");
              setSelectedDirection(carDirection);
            }}
          >
            {carDirection ? (
              <DirectionTabContent direction={carDirection} />
            ) : (
              <View
                style={{
                  flex: 1,
                  paddingTop: 24,
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            )}
          </TabScreen>
          <TabScreen
            label="Walk"
            onPress={() => {
              setTitle("Walk");
              setSelectedDirection(footDirection);
            }}
          >
            {footDirection ? (
              <DirectionTabContent direction={footDirection} />
            ) : (
              <View
                style={{
                  flex: 1,
                  paddingTop: 24,
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            )}
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </Animated.View>
  );
};

const Header = ({ title }: { title: string }) => {
  const setDirection = useStore((state) => state.setDirections);
  return (
    <View
      style={{
        paddingHorizontal: 12,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <IconButton
        style={{ backgroundColor: "#f1f1f1" }}
        size={16}
        mode="contained"
        icon="close"
        onPress={() => setDirection(undefined)}
      />
    </View>
  );
};

export default DirectionInstructionSheet;
