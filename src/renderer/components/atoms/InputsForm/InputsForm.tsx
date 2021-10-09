import { Box, Button, Stack, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

type InputsFormProps = {
  items: {
    id: string;
    label: string;
  }[];
};
const InputsForm: React.FC<InputsFormProps> = ({ items }) => {
  const [inputText, setInputText] = React.useState("");
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%", padding: 40 }}>
      <Stack justifyContent="space-between" spacing={2} alignItems="center">
        {items.map((item, i) => {
          return (
            <TextField
              key={item.id}
              fullWidth
              id={item.id}
              label={item.label}
              onChange={formik.handleChange("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              value={formik.values.email}
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
