import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {} from "@database/controllers";
import { createReport } from "@database/controllers/estadistica";
import { Presupuesto } from "@models/presupuesto";
import { GridValueGetterParams } from "@mui/x-data-grid";
import * as yup from "yup";

export const getLabel = (key: Extract<keyof Presupuesto, string>): string => {
  const diccionary = {
    code: "Dimensión",
    programa: "Programa",
    initValue: "Ingreso neto",
    gastoTotal: "Gasto total",
    ingresoTotal: "Ingreso total",
    total: "Total",
    tipoPrograma: "Tipo de programa",
    responsable: "Responsable",
  };
  return diccionary[key];
};
export const createPresupuestoForm = async (): Promise<
  TextFieldProps<Presupuesto>[]
> => {
  const report = await createReport();
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
      id: "tipoPrograma",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "responsable",
      type: "string",
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      isHiddenInForm: true,
      initialValue: 0,
      id: "ingresoTotal",
      type: "number",
      renderInTable: (context: GridValueGetterParams) => {
        const presupuesto = report.presupuestos.find(
          (presupuesto) =>
            presupuesto.code == (context.getValue(context.id, "code") || "")
        );
        if (presupuesto) {
          return Math.round(presupuesto.ingresoTotal * 100) / 100;
        } else {
          return 0;
        }
      },
    },
    {
      isHiddenInForm: true,
      initialValue: 0,
      id: "gastoTotal",
      type: "number",
      renderInTable: (context: GridValueGetterParams) => {
        const presupuesto = report.presupuestos.find(
          (presupuesto) =>
            presupuesto.code == (context.getValue(context.id, "code") || "")
        );
        if (presupuesto) {
          return Math.round(presupuesto.gastoTotal * 100) / 100;
        } else {
          return 0;
        }
      },
    },
    {
      isHiddenInForm: true,
      initialValue: 0,
      id: "total",
      type: "number",
      renderInTable: (context: GridValueGetterParams) => {
        const presupuesto = report.presupuestos.find(
          (presupuesto) =>
            presupuesto.code == (context.getValue(context.id, "code") || "")
        );
        if (presupuesto) {
          return Math.round(presupuesto.total * 100) / 100;
        } else {
          return 0;
        }
      },
    },
  ] as const;
  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
