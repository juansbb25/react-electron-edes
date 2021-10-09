import InputsForm from "@components/atoms/InputsForm";
import UILayout from "@components/layout/UILayout";
import React from "react";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { StandardTextFieldProps, TextField } from "@material-ui/core";
type EntrysPageProps = {};
const EntrysPage: React.FC<EntrysPageProps> = () => {
  const [value, setValue] = React.useState(null);

  return (
    <UILayout title="Ingresos">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          // TODO add explicit type to params
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </UILayout>
  );
};
export default EntrysPage;
