import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Death } from "@/constants/Entity";

interface Props {
  death: Death;
}

const DeathCard = ({ death }: Props) => {
  const info = [
    {
      label: "Date of birth",
      value: new Date(death.dateOfBirth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: "Date of death",
      value: new Date(death.dateOfDeath).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      label: "Next of kin name",
      value: death.nextOfKinName,
    },
    {
      label: "Next of kin relationship",
      value: death.nextOfKinRelationship,
    },
  ];
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            source="https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A-122.29009844646316%2C47.54607447032754&zoom=14.3497&marker=lonlat%3A-122.29188334609739%2C47.54403990655936%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A-122.29282631194182%2C47.549609195001494%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A-122.28726954893025%2C47.541766557545884%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=93c61485ed6a4e3db8e72ff7dba3eab8"
            style={styles.image}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View style={styles.titleContainer}>
              <AntDesign name="user" size={24} color="#333333" />
              <Text numberOfLines={1} style={styles.title}>
                {`${death.firstName} ${death.lastName}`}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <AntDesign name="contacts" size={24} color="#333333" />
              <Text style={styles.title}>{death.nextOfKinContact}</Text>
            </View>
          </View>
        </View>
        <View style={styles.subContent}>
          {info.map((item, index) => (
            <React.Fragment key={index}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 16,
                }}
              >
                <Text numberOfLines={1} style={{ color: "#858585", flex: 1 }}>
                  {item.label}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: "#333333", fontWeight: "500" }}
                >
                  {item.value}
                </Text>
              </View>
              {index < info.length - 1 && (
                <View
                  style={{ width: "100%", height: 1, backgroundColor: "white" }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: 300,
    borderRadius: 20,
  },
  cardHeader: {
    padding: 20,
  },
  cardContent: {
    padding: 20,
    gap: 16,
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "400",
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
    gap: 12,
  },
  subContent: {
    backgroundColor: "#F6F8FA",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
});

export default DeathCard;
