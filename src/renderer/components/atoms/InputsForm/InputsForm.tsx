import { Box, Button, Stack, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

type InputsFormProps = {
  items: {
    id: string;
    label: string;
  }[];
};
const InputsForm: React.FC<InputsFormProps> = ({ items }) => {
  const [inputText, setInputText] = React.useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%", padding: 40 }}>
      <Stack justifyContent="space-between" spacing={2} alignItems="center">
        {items.map((item, i) => {
          return (
            <TextField
              key={i}
              fullWidth
              id={item.id}
              label={item.label}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              focused
            />
          );
        })}
        <Button
          color="success"
          variant="contained"
          type="submit"
          style={{ width: 200 }}
        >
          Guardar
        </Button>
      </Stack>
    </form>
  );
};
export default InputsForm;
