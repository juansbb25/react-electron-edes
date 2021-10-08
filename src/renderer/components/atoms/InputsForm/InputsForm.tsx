import { Box, TextField } from "@material-ui/core";
import React from "react";

type InputsFormProps = {
  items: string[];
};
const InputsForm: React.FC<InputsFormProps> = ({ items }) => {
  const formItem = items.map((item, i) => {
    return <TextField id={item} label={item} />;
  });

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 8, width: "30ch" },
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      {formItem}
    </Box>
  );
};
export default InputsForm;
