import { GridValueGetterParams } from "@mui/x-data-grid";
import * as yup from "yup";

export type TextFieldProps<T> = {
  id: Extract<keyof T, string>;
  label: string;
  type: "string" | "number" | "date" | "array" | "boolean";
  isHiddenInForm?: boolean;
  autocomplete?: string[];
  validator?: any;
  initialValue: T[keyof T] | Array<any>;
  render?: (context: InitialValue<T>) => string | number | Date;
  renderInTable?: (
    context: GridValueGetterParams
  ) => string | number | Date | React.ReactElement; //used to render in tables mui-x
  editable?: boolean;
  arrayOptions?: TextFieldProps<Record<string, unknown>>[];
  full?: boolean;
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
