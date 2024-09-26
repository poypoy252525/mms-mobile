import axios from "axios";

const routes = async (
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
    const { data } = await axios.get(
      `https://graphhopper.com/api/1/route?${query}`
    );
    return data.paths;
  } catch (error) {
    // console.log(error);
  }
  return null;
};

export default routes;
