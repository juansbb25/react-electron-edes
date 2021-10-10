import { Button, Stack, TextField } from "@material-ui/core";
import DatePicker from "@mui/lab/DatePicker";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import moment from "moment";
import { InitialValue, TextFieldProps, Validator } from "./types";

type InputsFormProps = {
  onSubmit: (values: InitialValue) => void;
  items: TextFieldProps[];
};

document.addEventListener("keydown", function (event: any) {
  if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 2].focus();
    event.preventDefault();
  }
});
const InputsForm: React.FC<InputsFormProps> = ({ items, onSubmit }) => {
  const validator: Validator = {};
  items.forEach((item) => {
    if (item.validator) validator[item.id] = item.validator;
  });

  const initialValues: InitialValue = {};
  items.forEach((item) => {
    initialValues[item.id] = item.initialValue;
  });

  const validationSchema = yup.object(validator);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%", padding: 40 }}>
      <Stack justifyContent="space-between" spacing={2} alignItems="center">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(item.type === "string" || item.type === "number") && (
                <TextField
                  fullWidth
                  type={item.type === "number" ? item.type : ""}
                  id={item.id}
                  label={item.label}
                  onChange={formik.handleChange}
                  error={
                    formik.touched[item.id] && Boolean(formik.errors[item.id])
                  }
                  value={formik.values[item.id]}
                  helperText={formik.touched[item.id] && formik.errors[item.id]}
                  onKeyPress={(e) => {
                    e.key == "Enter" && e.preventDefault;
                  }}
                />
              )}
              {item.type === "date" && (
                <DatePicker
                  value={formik.values[item.id]}
                  label={item.label}
                  onChange={(e) => {
                    formik.setFieldValue(
                      item.id,
                      moment(e).format("DD-MM-YYYY")
                    );
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      fullWidth
                      {...params}
                      helperText={
                        formik.touched[item.id] && formik.errors[item.id]
                      }
                    />
                  )}
                />
              )}
            </div>
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
