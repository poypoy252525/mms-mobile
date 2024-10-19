import { Coordinate } from "@/types/coordinates";
import axios, { AxiosError } from "axios";

const getDirectionFromCurrentPosition = async <T>(
  currentLocation: Coordinate,
  destination: Coordinate,
  profile: "car" | "foot"
): Promise<T | undefined> => {
  console.log(destination, currentLocation);
  if (!destination || !currentLocation) return;
  try {
    const { data } = await axios.post<T>(
      `http://192.168.100.7:8989/route`,
      JSON.stringify({
        profile,
        points: [
          [currentLocation.longitude, currentLocation.latitude],
          [destination.longitude, destination.latitude],
        ],
        points_encoded: false,
      }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
    return data;
  } catch (error) {
    // if (error instanceof AxiosError) console.error(error.message);
    console.error("error getting direction: ", error);
    throw error;
  }
};

export default getDirectionFromCurrentPosition;
