import { initDatabase } from "@database/initDb";

interface Group {
  month: number;
  year: number;
  dimension: string;
}

interface GroupIngresos extends Group {
  abonos: number;
  saldos: number;
}

interface GroupGastos extends Group {
  valoresConIva: number;
  valoresSinIva: number;
}

export interface GroupPresupuesto {
  code: string;
  initValue: number;
  programa: string;
  gastoTotal: number;
  ingresoTotal: number;
  saldosTotal: number;
  tipoPrograma: string;
  responsable: string;
  total: number;
}

export interface Report {
  gastos: GroupGastos[];
  ingresos: GroupIngresos[];
  presupuestos: GroupPresupuesto[];
}

export const createReport = async (): Promise<Report> => {
  const db = await initDatabase();
  const gastos = db.chain.get("gastos").value();
  const ingresos = db.chain.get("ingresos").value();
  const presupuestos = db.chain.get("presupuestos").value();

  const gastosList: GroupGastos[] = [];
  const ingresosList: GroupIngresos[] = [];
  const presupuestoList: GroupPresupuesto[] = presupuestos.map(
    (presupuesto) => {
      return {
        ...presupuesto,
        saldosTotal: 0,
        gastoTotal: 0,
        ingresoTotal: 0,
        total: presupuesto.initValue,
      };
    }
  );

  gastos.forEach((gasto) => {
    const month = new Date(gasto.fecha).getMonth();
    const year = new Date(gasto.fecha).getFullYear();
    console.debug("gastos creacion de estadistica", month, year, gasto.fecha);
    const index = gastosList.findIndex(
      (gastoInList) =>
        gastoInList.month == month &&
        gastoInList.year == year &&
        gastoInList.dimension == gasto.dimension
    );
    if (index >= 0) {
      const gastoGroup = {
        month,
        year,
        dimension: gasto.dimension,
        valoresConIva: gastosList[index].valoresConIva + gasto.valorConIva,
        valoresSinIva: gastosList[index].valoresSinIva + gasto.valorSinIva,
      };
      gastosList[index] = gastoGroup;
    } else {
      const gastoGroup = {
        month,
        year,
        dimension: gasto.dimension,
        valoresConIva: gasto.valorConIva,
        valoresSinIva: gasto.valorSinIva,
      };
      gastosList.push(gastoGroup);
    }
    const indexPresupuesto = presupuestoList.findIndex(
      (presupuestoInList) => presupuestoInList.code == gasto.dimension
    );
    if (indexPresupuesto >= 0) {
      const presupuestoGroup = {
        ...presupuestoList[indexPresupuesto],
        gastoTotal:
          presupuestoList[indexPresupuesto].gastoTotal + gasto.valorConIva,
        total: presupuestoList[indexPresupuesto].total - gasto.valorConIva,
      };
      presupuestoList[indexPresupuesto] = presupuestoGroup;
    } else {
      const presupuestoGroup = {
        code: gasto.dimension,
        initValue: 0,
        programa: "Presupuesto creado automaticamente",
        gastoTotal: gasto.valorConIva,
        ingresoTotal: 0,
        total: 0 - gasto.valorConIva,
        saldosTotal: 0,
        tipoPrograma: "No generado",
        responsable: "No generado",
      };
      presupuestoList.push(presupuestoGroup);
    }
  });
  ingresos.forEach((ingreso) => {
    const month = new Date(ingreso.fecha).getMonth();
    const year = new Date(ingreso.fecha).getFullYear();
    const index = ingresosList.findIndex(
      (ingresoInList) =>
        ingresoInList.month == month &&
        ingresoInList.year == year &&
        ingresoInList.dimension == ingreso.dimension
    );
    if (index >= 0) {
      const ingresoGroup = {
        month,
        year,
        dimension: ingreso.dimension,
        abonos: ingreso.abono + ingresosList[index].abonos,
        saldos: ingreso.saldo + ingresosList[index].saldos,
      };
      ingresosList[index] = ingresoGroup;
    } else {
      const ingresoGroup = {
        month,
        year,
        dimension: ingreso.dimension,
        abonos: ingreso.abono,
        saldos: ingreso.saldo,
      };
      ingresosList.push(ingresoGroup);
    }

    const indexPresupuesto = presupuestoList.findIndex(
      (presupuestoInList) => presupuestoInList.code == ingreso.dimension
    );
    if (indexPresupuesto >= 0) {
      const presupuestoGroup = {
        ...presupuestoList[indexPresupuesto],
        ingresoTotal:
          presupuestoList[indexPresupuesto].ingresoTotal + ingreso.abono,
        total: presupuestoList[indexPresupuesto].total + ingreso.abono,
        saldosTotal:
          presupuestoList[indexPresupuesto].saldosTotal + ingreso.saldo,
      };
      presupuestoList[indexPresupuesto] = presupuestoGroup;
    } else {
      const presupuestoGroup = {
        code: ingreso.dimension,
        initValue: 0,
        programa: "Presupuesto creado automaticamente",
        ingresoTotal: ingreso.abono,
        gastoTotal: 0,
        total: ingreso.abono,
        saldosTotal: 0,
        tipoPrograma: "No generado",
        responsable: "No generado",
      };
      presupuestoList.push(presupuestoGroup);
    }
  });

  return {
    gastos: gastosList,
    ingresos: ingresosList,
    presupuestos: presupuestoList,
  };
};
