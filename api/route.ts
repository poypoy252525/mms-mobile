import { Directions } from "@/constants/Entity";
import { Coordinate } from "@/types/coordinates";
import axios, { AxiosError } from "axios";

const getDirection = async (
  currentLocation: Coordinate,
  destination: Coordinate,
  profile: "car" | "foot"
): Promise<Directions | undefined> => {
  if (!destination || !currentLocation) return;
  try {
    const { data } = await axios.post<Directions>(
      `https://graphhopper.com/api/1/route`,
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
        params: {
          key: "c7a05e01-fffd-4ec1-bdd5-b623c5fd2058",
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

export default getDirection;
