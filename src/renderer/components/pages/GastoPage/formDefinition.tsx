import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {} from "@database/controllers";
import { Gasto } from "@models/Transaccion";
import moment from "moment";
import * as yup from "yup";

export const createGastosForm = (): TextFieldProps<Gasto>[] => {
  const date = new Date();
  const todayDate = moment(date).format("DD-MM-YYYY");
  return [
    {
      initialValue: "",
      id: "dimension",
      label: "Dimension",
      type: "string",
      validator: yup
        .string()
        .min(2, "Se requiere texto")
        .required("Este campo es requerito"),
    },
    {
      initialValue: "",
      id: "programa",
      label: "Programa",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: todayDate,
      id: "fecha",
      label: "Fecha",
      type: "date",
      validator: yup
        .string()
        .min(2, "Se requiere texto")
        .required("Este campo es requerito"),
    },
    {
      initialValue: "",
      id: "factura",
      label: "Factura",
      type: "string",
      validator: yup
        .string()
        .min(2, "Se requiere texto")
        .required("Este campo es requerito"),
    },
    {
      initialValue: "",
      id: "proveedor",
      label: "Proveedor",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "responsable",
      label: "Responsable",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "QUITO",
      id: "ciudad",
      label: "Ciudad",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "observacion",
      label: "Observacion",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "categoria",
      label: "Categoria",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "subCategoria",
      label: "Subcategoria",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: 0,
      id: "iva",
      label: "IVA",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerito"),
    },
    {
      initialValue: 0,
      id: "valorConIva",
      label: "Valor con Iva",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerito"),
    },
    {
      initialValue: 0,
      id: "valorSinIva",
      label: "Valor sin Iva",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerito"),
    },
    {
      initialValue: 0,
      id: "req",
      label: "Requerimiento",
      type: "string",
      validator: yup
        .string()
        .min(2, "Se requiere texto")
        .required("Este campo es requerito"),
    },
  ];
};
