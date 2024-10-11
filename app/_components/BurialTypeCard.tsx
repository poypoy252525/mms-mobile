import { View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

interface Props {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
}

const BurialTypeCard = ({ title, description, image, onPress }: Props) => {
  return (
    <Card onPress={() => onPress()}>
      <Card.Cover style={{ marginBottom: 8 }} source={{ uri: image }} />
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        {/* <Text variant="bodySmall">{description}</Text> */}
      </Card.Content>
    </Card>
  );
};

export default BurialTypeCard;
