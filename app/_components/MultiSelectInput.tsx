import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { List, TextInput, TouchableRipple } from "react-native-paper";
import axios from "axios";
import { baseURL } from "@/constants/BaseURL";
import { User } from "@/constants/Entity";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";

const MultiSelectInput = () => {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    (async () => {
      try {
        const { data: users } = await axios.get<User[]>(`${baseURL}/api/users`);
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Email of your registered relative"
        label="Email"
        mode="outlined"
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <List.Item
            title={item.email}
            onPress={() => {}}
            style={styles.listItem}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 12,
  },
});

export default MultiSelectInput;
