import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@material-ui/core";

type DatePickerFieldProps = {
  name: string;
};
export const DatePickerField: React.FC<any> = ({
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      value={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      // TODO add explicit type to params
    />
  );
};

export default DatePickerField;
