import { Button, Stack, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

type Validator = {
  [key: string]: yup.AnyObjectSchema;
};
type InitialValue = {
  [key: string]: any;
};

type InputsFormProps = {
  items: {
    id: string;
    label: string;
    type: "string" | "number" | "date";
    validator: yup.AnyObjectSchema;
  }[];
};

const InputsForm: React.FC<InputsFormProps> = ({ items }) => {
  const validator: Validator = {};
  items.forEach((item) => {
    validator[item.id] = item.validator;
  });

  const initialValues: InitialValue = {};
  items.forEach((item) => {
    validator[item.id] = item.validator;
  });

  const validationSchema = yup.object(validator);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.debug(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%", padding: 40 }}>
      <Stack justifyContent="space-between" spacing={2} alignItems="center">
        {items.map((item) => {
          return (
            <>
              {item.type === "string" ||
                (item.type === "number" && (
                  <TextField
                    type={item.type === "number" ? item.type : ""}
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
                ))}
              {item.type === "date" && <></>}
            </>
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
