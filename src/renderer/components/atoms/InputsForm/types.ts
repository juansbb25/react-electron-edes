import * as yup from "yup";
export type TextFieldProps = {
  id: string;
  label: string;
  type: "string" | "number" | "date";
  validator?: any;
  initialValue: any;
};

export type InitialValue = {
  [key: string]: any;
};

export type Validator = {
  [key: string]: yup.AnyObjectSchema;
};
