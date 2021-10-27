/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createReport,
  GroupPresupuesto,
} from "@database/controllers/estadistica";
import { currencyFormat } from "@utils/number";
import moment from "moment";
import { mapMonthName, MonthNumber } from "@utils/date";
import lodash from "lodash";

export type TableColumn = {
  title: string;
  items: (string | number)[];
};

type TablePresupuesto<T extends GroupPresupuesto> = {
  title: string;
  presupuesto: T[];
};

export type ReportTable = {
  title: string;
  data: TableColumn[];
};
export const fromColToRow = (data: TableColumn[]): string[][] => {
  console.debug(data);
  const cols = [];
  const colsTitle: string[] = [];
  data.forEach((item) => {
    colsTitle.push(item.title);
  });
  cols.push(colsTitle);
  const length = data[0].items.length;
  const array = Array.from("x".repeat(length));
  array.forEach((_, i) => {
    const colsItem: (string | number)[] = [];
    data.forEach((tableCol) => {
      colsItem.push(tableCol.items[i]);
    });
    cols.push(colsItem);
  });
  console.debug(cols);
  return cols;
};

export const obtainMensualReport = async (
  information: { month: MonthNumber; year: number }[]
): Promise<ReportTable[]> => {
  const report = await createReport();
  const gastos = report.gastos.filter(
    (gasto) =>
      lodash.some(information, { month: gasto.month }) &&
      lodash.some(information, { year: gasto.year })
  );
  const ingresos = report.ingresos.filter(
    (ingreso) =>
      lodash.some(information, { month: ingreso.month }) &&
      lodash.some(information, { year: ingreso.year })
  );
  const presupuestos = report.presupuestos
    .filter(
      (presupuesto) =>
        lodash.some(gastos, { dimension: presupuesto.code }) ||
        lodash.some(ingresos, { dimension: presupuesto.code })
    )
    .map((presupuesto) => {
      return {
        ...presupuesto,
        gastoTotal: 0,
        ingresoTotal: 0,
        saldosTotal: 0,
        total: 0,
      };
    });

  const totalIngreso = (dimension: string): number => {
    const result = ingresos
      .filter((ingreso) => ingreso.dimension == dimension)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.abonos;
      }, 0);
    return result;
  };

  const totalGasto = (dimension: string): number => {
    const result = gastos
      .filter((gasto) => gasto.dimension == dimension)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.valoresConIva;
      }, 0);
    return result;
  };

  const totalSaldos = (dimension: string): number => {
    const result = ingresos
      .filter((ingreso) => ingreso.dimension == dimension)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.saldos;
      }, 0);
    return result;
  };

  const tableReport: TablePresupuesto<GroupPresupuesto>[] = [];
  presupuestos.forEach((presupuesto) => {
    const index = tableReport.findIndex(
      (item) => item.title == presupuesto.tipoPrograma
    );
    if (index >= 0) {
      tableReport[index] = {
        ...tableReport[index],
        presupuesto: [...tableReport[index].presupuesto, presupuesto],
      };
    } else {
      tableReport.push({
        title: presupuesto.tipoPrograma,
        presupuesto: [presupuesto],
      });
    }
  });

  const finalReport = tableReport.map((tableReport) => {
    const monthColsGasto = information.map((data) => {
      const dataCol = tableReport.presupuesto.map((presupuesto) =>
        currencyFormat(
          gastos.find(
            (gasto) =>
              gasto.month == data.month &&
              gasto.year == data.year &&
              gasto.dimension == presupuesto.code
          )?.valoresConIva || 0
        )
      );
      return {
        title: `${mapMonthName(data.month)} (${data.year})`,
        items: dataCol,
      };
    });

    const monthColsIngreso = information.map((data) => {
      const dataCol = tableReport.presupuesto.map((presupuesto) =>
        currencyFormat(
          ingresos.find(
            (ingreso) =>
              ingreso.month == data.month &&
              ingreso.year == data.year &&
              ingreso.dimension == presupuesto.code
          )?.abonos || 0
        )
      );
      return {
        title: `${mapMonthName(data.month)} (${data.year})`,
        items: dataCol,
      };
    });

    const table: TableColumn[] = [
      { title: "Dimensiones", items: [] },
      { title: "Nombre del programa", items: [] },
      { title: "Valor del presupuesto", items: [] },
      { title: "Responsable", items: [] },
      ...monthColsGasto,
      { title: "GastoTotal", items: [] },
      ...monthColsIngreso,
      { title: "IngresoTotal", items: [] },
      // { title: "Total ingresos", items: [] },
      // { title: "Total gastos", items: [] },
      { title: "Saldos pendientes", items: [] },
      { title: "Total", items: [] },
    ];
    tableReport.presupuesto.forEach((presupuesto) => {
      table[0].items.push(presupuesto.code);
      table[1].items.push(presupuesto.programa);
      table[2].items.push(currencyFormat(presupuesto.initValue));
      table[3].items.push(presupuesto.responsable);
      table[4 + monthColsGasto.length].items.push(
        currencyFormat(totalGasto(presupuesto.code))
      );

      table[5 + monthColsGasto.length * 2].items.push(
        currencyFormat(totalIngreso(presupuesto.code))
      );
      table[6 + monthColsGasto.length * 2].items.push(
        currencyFormat(totalSaldos(presupuesto.code))
      );
      table[7 + monthColsGasto.length * 2].items.push(
        currencyFormat(
          totalIngreso(presupuesto.code) - totalGasto(presupuesto.code)
        )
      );
    });
    return { title: tableReport.title, data: table };
  });
  return finalReport;
};

export const obtainAnualReport = async (
  year: number
): Promise<ReportTable[]> => {
  const report = await createReport();
  const gastos = report.gastos.filter((gasto) => gasto.year == year);
  const ingresos = report.ingresos.filter((ingreso) => ingreso.year == year);
  const presupuestos = report.presupuestos
    .filter(
      (presupuesto) =>
        lodash.some(gastos, { dimension: presupuesto.code }) ||
        lodash.some(ingresos, { dimension: presupuesto.code })
    )
    .map((presupuesto) => {
      return {
        ...presupuesto,
        gastoTotal: 0,
        ingresoTotal: 0,
        saldosTotal: 0,
        total: 0,
      };
    });

  console.debug("lodash filter", presupuestos);
  gastos.forEach((gasto) => {
    const index = presupuestos.findIndex(
      (presupuesto) => presupuesto.code == gasto.dimension
    );
    presupuestos[index].gastoTotal =
      presupuestos[index].gastoTotal + gasto.valoresConIva;
    presupuestos[index].total = presupuestos[index].total - gasto.valoresConIva;
  });

  ingresos.forEach((ingreso) => {
    const index = presupuestos.findIndex(
      (presupuesto) => presupuesto.code == ingreso.dimension
    );
    presupuestos[index].ingresoTotal =
      presupuestos[index].ingresoTotal + ingreso.abonos;
    presupuestos[index].saldosTotal =
      presupuestos[index].saldosTotal + ingreso.saldos;
    presupuestos[index].total = presupuestos[index].total + ingreso.abonos;
  });

  return splitIntoTable(presupuestos);
};

export const obtainTotalReport = async (): Promise<ReportTable[]> => {
  const report = await createReport();
  return splitIntoTable(report.presupuestos);
};

const splitIntoTable = <T extends GroupPresupuesto>(dataToSplit: T[]) => {
  const tableReport: TablePresupuesto<T>[] = [];
  dataToSplit.forEach((presupuesto) => {
    const index = tableReport.findIndex(
      (item) => item.title == presupuesto.tipoPrograma
    );
    if (index >= 0) {
      tableReport[index] = {
        ...tableReport[index],
        presupuesto: [...tableReport[index].presupuesto, presupuesto],
      };
    } else {
      tableReport.push({
        title: presupuesto.tipoPrograma,
        presupuesto: [presupuesto],
      });
    }
  });

  const finalReport = tableReport.map((tableReport) => {
    const table: TableColumn[] = [
      { title: "Dimensiones", items: [] },
      { title: "Nombre del programa", items: [] },
      { title: "Valor del presupuesto", items: [] },
      { title: "Responsable", items: [] },
      { title: "Total ingresos", items: [] },
      { title: "Total gastos", items: [] },
      { title: "Saldos pendientes", items: [] },
      { title: "Total", items: [] },
    ];

    tableReport.presupuesto.forEach((presupuesto) => {
      table[0].items.push(presupuesto.code);
      table[1].items.push(presupuesto.programa);
      table[2].items.push(currencyFormat(presupuesto.initValue));
      table[3].items.push(presupuesto.responsable);
      table[4].items.push(currencyFormat(presupuesto.ingresoTotal));
      table[5].items.push(currencyFormat(presupuesto.gastoTotal));
      table[6].items.push(currencyFormat(presupuesto.saldosTotal));
      table[7].items.push(currencyFormat(presupuesto.total));
    });
    return { title: tableReport.title, data: table };
  });

  return finalReport;
};

export const createDate = (year: number, month = 0): Date => {
  return new Date(year, month);
};

export const createYearNumber = (date: moment.Moment): number => {
  return date.year();
};

export const createMonthNumber = (date: moment.Moment): MonthNumber => {
  return date.month() as MonthNumber;
};

export const currentDate = (): moment.Moment => {
  return moment(new Date());
};
