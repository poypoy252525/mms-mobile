import {
  Accuracy,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";

const maxLat = 14.733714;
const minLat = 14.73209;
const maxLng = 121.147828;
const minLng = 121.145216;
14.733352589646707;

export const isOutsideOfArea = async () => {
  try {
    const { status, granted } = await getForegroundPermissionsAsync();
    if (status !== "granted" || !granted) throw new Error("permission denied.");
    const { coords } = await getCurrentPositionAsync({
      accuracy: Accuracy.High,
    });
    const { latitude, longitude } = coords;

    return (
      latitude < minLat ||
      latitude > maxLat ||
      longitude < minLng ||
      longitude > maxLng
    );
  } catch (error) {
    console.error("isOutsideOfArea error: ", error);
    throw error;
  }
};
