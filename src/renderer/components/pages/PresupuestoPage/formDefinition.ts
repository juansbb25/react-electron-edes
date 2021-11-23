import { TextFieldProps } from "@components/atoms/InputsForm/types";
import {} from "@database/controllers";
import { createReport } from "@database/controllers/estadistica";
import { getRubros } from "@database/controllers/rubro";
import { Presupuesto } from "@models/presupuesto";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { cleanData } from "@utils/string";
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
    rubros: "Agregar rubros",
  };
  return diccionary[key];
};
export const createPresupuestoForm = async (
  isHiddenId = false,
  presupuestoCode = "1234"
): Promise<TextFieldProps<Presupuesto>[]> => {
  console.debug("presupuestoCode", presupuestoCode);
  const report = await createReport();
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
  const formRubros = [
    {
      initialValue: "",
      id: "initValue" as const,
      type: "number" as const,
      validator: yup.number().required("Este campo es requerido"),
      label: "Valor inicial",
      full: true,
    },
    {
      initialValue: autoformList.length > 0 ? autoformList[0] : "",
      id: "rubro" as const,
      type: "string" as const,
      autocomplete: autoformList as string[],
      validator: yup.string().required("Este campo es requerido"),
      label: "Rubro",
      full: true,
    },
    {
      initialValue: 0,
      id: "gasto" as const,
      type: "number" as const,
      label: "Total Gasto",
      full: true,
      isHiddenInForm: true,
      renderInTable: (context: GridValueGetterParams) => {
        const presupuesto = report.presupuestos.find(
          (presupuesto) => presupuesto.code == presupuestoCode
        );
        if (presupuesto) {
          const gastoResult = presupuesto.gastosRubro.find(
            (gastoRubro) =>
              cleanData(gastoRubro.rubro) ==
              cleanData((context.getValue(context.id, "rubro") as string) || "")
          );
          return Math.round((gastoResult ? gastoResult.total : 0) * 100) / 100;
        } else {
          return 0;
        }
      },
    },
    {
      initialValue: 0,
      id: "total" as const,
      type: "number" as const,
      label: "Total Saldo",
      full: true,
      isHiddenInForm: true,
      renderInTable: (context: GridValueGetterParams) => {
        const presupuesto = report.presupuestos.find(
          (presupuesto) => presupuesto.code == presupuestoCode
        );
        const rubro = (context.getValue(context.id, "rubro") as string) || "";
        console.debug("presupuesto report", presupuesto, rubro);
        if (presupuesto) {
          const gastoResult = presupuesto.gastosRubro.find(
            (gastoRubro) => cleanData(gastoRubro.rubro) == cleanData(rubro)
          );
          console.debug("informe", gastoResult);
          const initValue =
            (context.getValue(context.id, "initValue") as number) || 0;

          return (
            Math.round(
              (gastoResult ? initValue - gastoResult.total : initValue) * 100
            ) / 100
          );
        } else {
          return 0;
        }
      },
    },
  ];
  const formCreation = [
    {
      isHiddenInForm: isHiddenId,
      initialValue: "",
      id: "code" as const,
      type: "string" as const,
      validator: yup
        .string()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "initValue" as const,
      type: "number" as const,
      validator: yup
        .number()
        .min(0, "El Valor debe ser mayor o igual a 0")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "programa" as const,
      type: "string" as const,
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "tipoPrograma" as const,
      type: "string" as const,
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      initialValue: "",
      id: "responsable" as const,
      type: "string" as const,
      validator: yup
        .string()
        .min(2, "Debe tener como mínimo dos caracteres.")
        .required("Este campo es requerido"),
    },
    {
      isHiddenInForm: true,
      initialValue: 0,
      id: "ingresoTotal" as const,
      type: "number" as const,
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
      id: "gastoTotal" as const,
      type: "number" as const,
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
      id: "total" as const,
      type: "number" as const,
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
    {
      isHiddenInForm: true,
      initialValue: 0,
      id: "total" as const,
      type: "number" as const,
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
    {
      initialValue: [],
      id: "rubros" as const,
      type: "array" as const,
      arrayOptions: formRubros,
      isHiddenInTable: true,
      renderInTable: (context: GridValueGetterParams) => {
        console.debug(context);
        return "";
      },
    },
  ];
  const formWithName = formCreation.map((item) => {
    return { ...item, label: getLabel(item.id) };
  });
  return formWithName;
};
