import * as yup from "yup";

export type TextFieldProps<T> = {
  id: Extract<keyof T, string>;
  label: string;
  type: "string" | "number" | "date";
  validator?: any;
  initialValue: T[keyof T];
  render?: (context: InitialValue<T>) => string | number | Date;
};

export type TextFieldPropsList<T> = {
  id: Extract<keyof T, string>;
  label: string;
  type: "string" | "number" | "date";
  validator?: any;
  initialValue: T[keyof T];
};

export type InitialValue<T> = {
  [Property in keyof T]: any;
};

export type Validator<Type> = {
  [Property in keyof Type]: yup.AnyObjectSchema;
};
