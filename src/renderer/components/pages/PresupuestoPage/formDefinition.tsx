import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {} from "@database/controllers";
import { Presupuesto } from "@models/presupuesto";
import * as yup from "yup";

export const createGastosForm = (): TextFieldProps<Presupuesto>[] => {
  return [
    {
      initialValue: "",
      id: "code",
      label: "Codigo",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerito"),
    },
    {
      initialValue: "",
      id: "initValue",
      label: "Valor Inicial",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerito"),
    },
  ];
};
