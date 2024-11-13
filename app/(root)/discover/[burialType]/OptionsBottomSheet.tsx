import { baseURL } from "@/constants/BaseURL";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useRef, useState } from "react";
import { ActivityIndicator, List, Snackbar } from "react-native-paper";

interface Props {
  index: number;
  onIndexChange: (index: number) => void;
  deceased?: Deceased;
}

const OptionsBottomSheet = ({ index, onIndexChange, deceased }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToList = async () => {
    if (!deceased) return;
    try {
      setLoading(true);
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
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error adding to list: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            left={(props) =>
              loading ? (
                <ActivityIndicator size="small" {...props} />
              ) : (
                <List.Icon {...props} icon="plus" />
              )
            }
            title="Add to list"
            onPress={() => handleAddToList()}
          />
        </BottomSheetScrollView>
      </BottomSheet>
      <Snackbar
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
      >
        Added to bookmark.
      </Snackbar>
    </>
  );
};

export default OptionsBottomSheet;
