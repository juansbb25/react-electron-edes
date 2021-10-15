import { TextFieldProps } from "@components/atoms/InputsForm/types";
import { IngresoInput } from "@database/controllers";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof IngresoInput, string>): string => {
  const diccionary = {
    id: "id",
    dimension: "Dimension",
    programa: "Programa",
    fecha: "Fecha",
    factura: "Factura",
    proveedor: "Proveedor",
    responsable: "Responsable",
    ciudad: "Ciudad",
    observacion: "Observacion",
    empresa: "Empresa",
    cedula: "Cedula",
    correo: "Correo",
    montoCurso: "Monto en Curso",
    porcentajeBeca: "Porcentaje De Beca",
    montoBeca: "Monto Beca",
    abono: "Abono",
    saldo: "Saldo",
    numBoucher: "Numero de Boucher",
    numDeposito: "Numero de Deposito",
    transferencia: "Transferencia",
  };
  return diccionary[key];
};

export const createIngresosForm = (): TextFieldProps<IngresoInput>[] => {
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
      validator: yup.string().required("Este campo es requerido"),
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
      id: "empresa",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "cedula",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "correo",
      type: "string",
      validator: yup.string().email("El formato del correo no es el correcto"),
    },
    {
      initialValue: 0,
      id: "montoCurso",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "porcentajeBeca",
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
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "abono",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: 0,
      id: "saldo",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "numBoucher",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "numDeposito",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "transferencia",
      type: "string",
      validator: yup.string(),
    },
  ] as const;

  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
