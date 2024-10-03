import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import SingleDatePicker from "../_components/SingleDatePIcker";
import axios from "axios";
import { baseURL } from "@/constants/BaseURL";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CreateRequestAlertDialog from "../_components/CreateRequestAlertDialog";

export interface FormData {
  firstName?: string;
  lastName?: string;
  causeOfDeath?: string;
  dateOfBirth?: Date;
  dateOfDeath?: Date;
  relativeName?: string;
  relativeRelationship?: string;
  contact?: string;
}

const Create = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [result, setResult] = useState<string>();

  const handleSubmit = async () => {
    try {
      const { data: result } = await axios.post(
        `${baseURL}/api/users/${
          GoogleSignin.getCurrentUser()?.user.id
        }/requests`,
        formData
      );
      setResult(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [result]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 32, paddingVertical: 16 }}>
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Deceased Details
              </Text>
            </View>
            <View style={{ gap: 16, flex: 1 }}>
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, firstName: text }))
                }
                label="First name"
                mode="outlined"
              />
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, lastName: text }))
                }
                label="Last name"
                mode="outlined"
              />
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, causeOfDeath: text }))
                }
                label="Cause of death"
                mode="outlined"
              />
              <SingleDatePicker
                onPickdate={(date) =>
                  setFormData((prev) => ({ ...prev, dateOfBirth: date }))
                }
                label="Date of birth"
              />
              <SingleDatePicker
                onPickdate={(date) =>
                  setFormData((prev) => ({ ...prev, dateOfDeath: date }))
                }
                label="Date of death"
              />
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Relative's Details
              </Text>
            </View>
            <View style={{ gap: 16, flex: 1 }}>
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, relativeName: text }))
                }
                label="Name"
                mode="outlined"
              />
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    relativeRelationship: text,
                  }))
                }
                label="Relationship"
                mode="outlined"
              />
              <TextInput
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, contact: text }))
                }
                label="Contact number"
                mode="outlined"
              />
            </View>
          </View>
          <CreateRequestAlertDialog onSubmit={() => handleSubmit()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
