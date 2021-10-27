import {
  InitialValue,
  TextFieldProps,
} from "@components/atoms/InputsForm/types";
import { IngresoInput } from "@database/controllers";
import { GridValueGetterParams } from "@mui/x-data-grid";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof IngresoInput, string>): string => {
  const diccionary = {
    id: "id",
    dimension: "Dimensión",
    fecha: "Fecha",
    factura: "Factura",
    proveedor: "Nombre",
    responsable: "Responsable",
    ciudad: "Ciudad",
    observacion: "Observación",
    empresa: "Empresa",
    cedula: "Cédula",
    correo: "Correo",
    montoCurso: "Monto del Curso",
    porcentajeBeca: "Porcentaje De Beca",
    montoBeca: "Monto Beca",
    abono: "Abono",
    saldo: "Saldo",
    numBoucher: "Número de Boucher",
    numDeposito: "Número de Depósito",
    transferencia: "Transferencia",
    montoCancelar: "Monto a cancelar",
    programa: "Programa",
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
      id: "proveedor",
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
      id: "programa",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
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
      initialValue: "QUITO",
      id: "ciudad",
      type: "string",
      validator: yup.string(),
    },
    {
      initialValue: "",
      id: "correo",
      type: "string",
      validator: yup.string().email("El formato del correo no es el correcto"),
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
      initialValue: date,
      id: "fecha",
      type: "date",
      validator: yup.date().required("Este campo es requerido"),
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
      id: "montoCancelar",
      type: "number",
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
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
      render: (context: InitialValue<IngresoInput>) => {
        return context.montoCurso - context.montoCancelar;
      },
      renderInTable: (context: GridValueGetterParams) => {
        return (
          ((context.getValue(context.id, "montoCurso") as number) || 0) -
          ((context.getValue(context.id, "montoCancelar") as number) || 0)
        );
      },
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
      render: (context: InitialValue<IngresoInput>) => {
        return context.montoCurso > 0
          ? ((context.montoCurso - context.montoCancelar) /
              context.montoCurso) *
              100
          : 0;
      },
      renderInTable: (context: GridValueGetterParams) => {
        return ((context.getValue(context.id, "montoCancelar") as number) ||
          0) > 0
          ? Math.round(
              100 *
                ((((context.getValue(context.id, "montoCurso") as number) ||
                  0) -
                  ((context.getValue(context.id, "montoCancelar") as number) ||
                    0)) /
                  ((context.getValue(context.id, "montoCurso") as number) ||
                    1)) *
                100
            ) / 100
          : 0;
      },
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
      validator: yup.number().required("Este campo es requerido"),
      render: (context: InitialValue<IngresoInput>) => {
        return context.montoCancelar - context.abono;
      },
      renderInTable: (context: GridValueGetterParams) => {
        return (
          ((context.getValue(context.id, "montoCancelar") as number) || 0) -
          ((context.getValue(context.id, "abono") as number) || 0)
        );
      },
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
    {
      initialValue: "",
      id: "observacion",
      type: "string",
      validator: yup.string(),
    },
  ] as const;

  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
