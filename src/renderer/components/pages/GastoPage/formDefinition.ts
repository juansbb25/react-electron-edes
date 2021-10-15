import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
import { GastoInput } from "@database/controllers/gasto";
import { GridValueGetterParams } from "@mui/x-data-grid";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof GastoInput, string>): string => {
  const diccionary = {
    id: "id",
    dimension: "Dimensión",
    programa: "Programa",
    fecha: "Fecha",
    factura: "Factura",
    proveedor: "Proveedor",
    responsable: "Responsable",
    ciudad: "Ciudad",
    observacion: "Observacion",
    categoria: "Categoria",
    subCategoria: "Subcategoria",
    iva: "Iva",
    valorConIva: "Valor Con Iva",
    valorSinIva: "Valor Sin Iva",
    req: "Requerimiento",
  };
  return diccionary[key];
};
export const createGastosForm = (): TextFieldProps<GastoInput>[] => {
  const date = new Date();
  const formCreation = [
    {
      initialValue: "",
      id: "dimension",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "programa",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: date,
      id: "fecha",
      type: "date",
      validator: yup.date().required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "factura",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "proveedor",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "responsable",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "QUITO",
      id: "ciudad",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "observacion",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "categoria",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "subCategoria",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: 0,
      id: "valorSinIva",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "iva",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },

    {
      initialValue: 0,
      id: "valorConIva",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
      render: (context: InitialValue<GastoInput>) => {
        return (context.iva * context.valorSinIva) / 100 + context.valorSinIva;
      },
      renderInTable: (context: GridValueGetterParams) => {
        return (
          (((context.getValue(context.id, "iva") as number) || 0) *
            ((context.getValue(context.id, "valorSinIva") as number) || 0)) /
            100 +
          ((context.getValue(context.id, "valorSinIva") as number) || 0)
        );
      },
    },

    {
      initialValue: "",
      id: "req",
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
