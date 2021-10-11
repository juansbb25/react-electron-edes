import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { IngresoInput } from "@database/controllers";
import moment from "moment";
import * as yup from "yup";

export const createIngresosForm = (): TextFieldProps<IngresoInput>[] => {
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
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
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
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "factura",
      label: "Factura",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
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
      id: "empresa",
      label: "Empresa",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "cedula",
      label: "Cedula",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "correo",
      label: "Correo",
      type: "string",
      validator: yup.string().email("El formato del correo no es el correcto"),
    },
    {
      initialValue: 0,
      id: "montoCurso",
      label: "Monto en Curso",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "porcentajeBeca",
      label: "Porcentaje De Beca",
      type: "number",
      validator: yup
        .number()
        .max(100, "El valor debe estar entre 0 y 100")
        .min(0, "El valor debe estar entre 0 y 100")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "montoBeca",
      label: "Monto Beca",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "abono",
      label: "Abono",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "saldo",
      label: "Saldo",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "numBoucher",
      label: "Numero de Boucher",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "numDeposito",
      label: "Numero de Deposito",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "transferencia",
      label: "Transferencia",
      type: "string",
      validator: yup.string(),
    },
  ];
};
