import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import {
  DatePickerModal,
  registerTranslation,
  en,
} from "react-native-paper-dates";
import { SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";

registerTranslation("en", en);

interface Props {
  label?: string;
  onPickdate: (selectedDate?: Date) => void;
}

const SingleDatePicker = ({ label, onPickdate }: Props) => {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback<SingleChange>(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  useEffect(() => {
    onPickdate(date);
  }, [date]);

  return (
    <View>
      <Text style={{ marginLeft: 5 }}>{label || "Pick a date"}</Text>
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        theme={{}}
        style={{ borderRadius: 5, width: "100%" }}
      >
        {date
          ? date
              .toLocaleDateString("en", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })
              .toString()
          : label || "Pick a date"}
      </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
    </View>
  );
};

export default SingleDatePicker;
