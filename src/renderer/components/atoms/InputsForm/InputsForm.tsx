import { Button, Grid, TextField } from "@material-ui/core";
import DatePicker from "@mui/lab/DatePicker";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import moment from "moment";
import { InitialValue, TextFieldProps, Validator } from "./types";

type InputsFormProps<T> = {
  onSubmit: (values: InitialValue<T>) => void;
  items: TextFieldProps<T>[];
};

document.addEventListener("keydown", function (event: any) {
  if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 2].focus();
    event.preventDefault();
  }
});
const InputsForm = <T extends unknown>({
  items,
  onSubmit,
}: InputsFormProps<T>): React.ReactElement => {
  const validator: Validator<T> = {} as Validator<T>;
  items.forEach((item) => {
    if (item.validator) validator[item.id] = item.validator;
  });

  const initialValues: InitialValue<T> = {} as InitialValue<T>;
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
      <Grid container spacing={2}>
        {items.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
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
            </Grid>
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
      </Grid>
    </form>
  );
};
export default InputsForm;
