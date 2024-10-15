import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";

import ImageCover from "@/assets/images/image.png";
import { baseURL } from "@/constants/BaseURL";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useStore } from "../../stores/store";

GoogleSignin.configure({
  webClientId:
    "574017815971-irdgco7gesi6t214h9i8dejgrd9ldn21.apps.googleusercontent.com",
});

const signIn = async (
  setLoading: (isLoading: boolean) => void,
  pushToken: string
) => {
  try {
    await GoogleSignin.hasPlayServices();
    setLoading(true);
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const { user } = response.data;
      try {
        const userData = await axios.post(`${baseURL}/api/users`, {
          googleId: user.id,
          email: user.email,
          firstName: user.givenName,
          lastName: user.familyName,
          photo: user.photo,
          pushToken,
        });
        console.log(userData);
      } catch (error) {
        // if (error instanceof AxiosError) console.log(error.response?.data);
      }

      router.push("/(root)");
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          alert("In progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          alert("play services is not available or outdated.");
          break;
        default:
          console.log(error);
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  } finally {
    setLoading(false);
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const SignIn = () => {
  const [isLoading, setLoading] = useState<boolean>();
  const [expoPushToken, setExpoPushToken] = useState("");
  const setNotification = useStore((state) => state.setNotification);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    (async () => {
      try {
        const expoPushTokenString = await registerForPushNotificationsAsync();
        if (!expoPushTokenString) return;
        setExpoPushToken(expoPushTokenString);
      } catch (error) {
        console.log(error);
      }
    })();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (GoogleSignin.getCurrentUser()) return <Redirect href="/(root)" />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image source={ImageCover} style={styles.image} />
          <LinearGradient
            colors={["transparent", "white"]}
            style={styles.imageGradient}
          />
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View style={styles.contentContainer}>
          <Button
            icon="google"
            onPress={() => signIn(setLoading, expoPushToken)}
            style={{ width: "100%" }}
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign in with Google
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  imageContainer: {
    position: "relative",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    height: 300,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 4,
  },
  signUpButton: {
    marginTop: 50,
  },
});

export default SignIn;
