import axios from "axios";

const getDirectionFromCurrentPosition = async <T>(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
) => {
  const query = new URLSearchParams();
  query.append("profile", "foot");
  query.append("point", `${startLat},${startLon}`);
  query.append("point", `${endLat},${endLon}`);
  query.append("points_encoded", "false");
  query.append("key", "c7a05e01-fffd-4ec1-bdd5-b623c5fd2058");

  try {
    const fetch = await axios.get<T>(
      `https://graphhopper.com/api/1/route?${query}`
    );

    return fetch.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getDirectionFromCurrentPosition;
