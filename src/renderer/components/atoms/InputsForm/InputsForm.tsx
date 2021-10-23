import { Autocomplete, Grid, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useFormik } from "formik";
import React, { forwardRef, Ref, useImperativeHandle, useEffect } from "react";
import * as yup from "yup";
import { InitialValue, TextFieldProps, Validator } from "./types";

type InputsFormProps<T> = {
  onSubmit: (
    values: InitialValue<T>,
    { resetForm }: { resetForm: any }
  ) => void;
  items: TextFieldProps<T>[];
};

export type RefObject = {
  submitForm: () => void;
};

const InputsForm = <T,>(
  { items, onSubmit }: InputsFormProps<T>,
  ref: Ref<RefObject>
): React.ReactElement => {
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
  useImperativeHandle(ref, () => ({
    submitForm() {
      const submit = formik.submitForm;
      submit();
    },
  }));

  useEffect(() => {
    const eventEnter = (event: any) => {
      if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
        //event.preventDefault();
        event.stopPropagation();
        const form = event.target?.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        console.debug(form, index, event.target, event.target?.type);
        if (event.target?.type === "tel") {
          form.elements[index + 3].focus();
        } else form.elements[index + 2].focus();
      }
    };
    document.addEventListener("keydown", eventEnter);
    return () => document.removeEventListener("keydown", eventEnter);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {items.map((item) => {
          return !item.isHiddenInForm ? (
            <Grid
              item
              xs={12}
              sm={items.length > 1 ? 6 : 12}
              md={items.length > 1 ? 6 : 12}
              key={item.id}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(item.type === "string" || item.type === "number") &&
                !item.autocomplete && (
                  <TextField
                    fullWidth
                    type={item.type === "number" ? item.type : ""}
                    id={item.id}
                    label={item.label}
                    onChange={formik.handleChange}
                    error={
                      formik.touched[item.id] && Boolean(formik.errors[item.id])
                    }
                    value={
                      item.render
                        ? item.render(formik.values)
                        : formik.values[item.id]
                    }
                    helperText={
                      formik.touched[item.id] && formik.errors[item.id]
                    }
                    onKeyPress={(e) => {
                      e.key == "Enter" && e.preventDefault;
                    }}
                    disabled={!!item.render}
                  />
                )}
              {item.type === "date" && (
                <DatePicker
                  value={formik.values[item.id]}
                  label={item.label}
                  onChange={(e: Date | null) => {
                    formik.setFieldValue(item.id, e);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      fullWidth
                      {...params}
                      helperText={
                        formik.touched[item.id] &&
                        formik.errors[item.id] &&
                        "La fecha es requerida y debe tener un formato válido"
                      }
                    />
                  )}
                />
              )}
              {item.type === "string" && item.autocomplete && (
                <Autocomplete
                  value={formik.values[item.id]}
                  sx={{ width: "100%" }}
                  options={item.autocomplete}
                  onChange={(_, value) => formik.setFieldValue(item.id, value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={item.label}
                      helperText={
                        formik.touched[item.id] && formik.errors[item.id]
                      }
                    />
                  )}
                />
              )}
            </Grid>
          ) : (
            <></>
          );
        })}
      </Grid>
    </form>
  );
};
export default forwardRef(InputsForm);
