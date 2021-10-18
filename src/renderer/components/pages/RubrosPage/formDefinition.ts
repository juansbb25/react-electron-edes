import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { RubroInput } from "@database/controllers/rubro";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof RubroInput, string>): string => {
  const diccionary = {
    id: "id",
    dimension: "Dimensión",
    nombre: "Nombre",
  };
  return diccionary[key];
};
export const createRubroForm = (): TextFieldProps<RubroInput>[] => {
  const formCreation = [
    {
      initialValue: "",
      id: "nombre",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
  ] as const;
  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
