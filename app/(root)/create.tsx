import React from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import SingleDatePicker from "../_components/SingleDatePIcker";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 32 }}>
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Deceased Details
              </Text>
            </View>
            <View style={{ gap: 16, flex: 1 }}>
              <TextInput label="First name" mode="outlined" />
              <TextInput label="Last name" mode="outlined" />
              <TextInput label="Cause of death" mode="outlined" />
              <SingleDatePicker label="Date of birth" />
              <SingleDatePicker label="Date of death" />
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Relative's Details
              </Text>
            </View>
            <View style={{ gap: 16, flex: 1 }}>
              <TextInput label="Name" mode="outlined" />
              <TextInput label="Relationship" mode="outlined" />
              <TextInput label="Contact number" mode="outlined" />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
