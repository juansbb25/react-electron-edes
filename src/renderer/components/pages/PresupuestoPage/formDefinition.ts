import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {} from "@database/controllers";
import { Presupuesto } from "@models/presupuesto";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof Presupuesto, string>): string => {
  const diccionary = {
    code: "Codigo",
    initValue: "Valor Inicial",
  };
  return diccionary[key];
};
export const createPresupuestoForm = (): TextFieldProps<Presupuesto>[] => {
  const formCreation = [
    {
      initialValue: "",
      id: "code",
      type: "string",
      validator: yup
        .string()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "initValue",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
  ] as const;
  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
