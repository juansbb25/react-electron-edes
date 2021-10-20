import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
import { GastoInput } from "@database/controllers/gasto";
import { getRubros } from "@database/controllers/rubro";
import { GridValueGetterParams } from "@mui/x-data-grid";
import console from "console";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof GastoInput, string>): string => {
  const diccionary = {
    id: "id",
    dimension: "Dimensión",
    fecha: "Fecha",
    factura: "Factura",
    proveedor: "Proveedor",
    responsable: "Responsable",
    ciudad: "Ciudad",
    observacion: "Observación",
    categoria: "Categoría",
    iva: "Iva",
    valorConIva: "Valor Con Iva",
    valorSinIva: "Valor Sin Iva",
    req: "Requerimiento",
  };
  return diccionary[key];
};
export const createGastosForm = async (): Promise<
  TextFieldProps<GastoInput>[]
> => {
  const date = new Date();
  const rubros = async () => {
    try {
      const rubros = await getRubros();
      return rubros.values.map((items) => {
        return items.nombre;
      });
    } catch (error) {
      console.debug(error);
      return [];
    }
  };
  const autoformList = await rubros();

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
      initialValue: autoformList.length > 0 ? autoformList[0] : "",
      id: "categoria",
      type: "string",
      autocomplete: autoformList as string[],
      validator: yup.string().required("Este campo es requerido"),
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
