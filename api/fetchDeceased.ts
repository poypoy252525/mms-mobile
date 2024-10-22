import { baseURL } from "@/constants/BaseURL";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";

export const fetchDeceased = async (
  burialType?: BurialType
): Promise<(Deceased & { owner: Owner; burial: Burial })[]> => {
  try {
    await GoogleSignin.signInSilently();
    const { idToken } = GoogleSignin.getCurrentUser()!;
    const { data } = await axios.get<
      (Deceased & { owner: Owner; burial: Burial })[]
    >(`${baseURL}/api/deceased`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        burialType,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch deceased: ", error);
    throw error;
  }
};
