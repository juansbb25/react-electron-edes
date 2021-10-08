import { Gasto, Ingreso } from "./Transaccion";

export interface Presupuesto {
  code: string;
  initValue: number;
  ingresos: Ingreso[];
  gastos: Gasto[];
  totalIngresos: number;
  totalGastos: number;
  lastDateCalculated: Date;
}
