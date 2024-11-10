import { baseURL } from "@/constants/BaseURL";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useRef } from "react";
import { List } from "react-native-paper";

interface Props {
  index: number;
  onIndexChange: (index: number) => void;
  deceased?: Deceased;
}

const OptionsBottomSheet = ({ index, onIndexChange, deceased }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleAddToList = async () => {
    if (!deceased) return;
    try {
      await GoogleSignin.signInSilently();
      const { idToken, user } = GoogleSignin.getCurrentUser()!;
      const { data } = await axios.post(
        `${baseURL}/api/users/${user.id}/deceased`,
        { deceasedId: deceased.id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      bottomSheetRef.current?.close();
    } catch (error) {
      console.error("Error adding to list: ", error);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      onChange={(index) => onIndexChange(index)}
    >
      <BottomSheetScrollView>
        <List.Item
          left={(props) => <List.Icon {...props} icon="plus" />}
          title="Add to list"
          onPress={() => handleAddToList()}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default OptionsBottomSheet;
