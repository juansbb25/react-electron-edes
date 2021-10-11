import { Presupuesto } from "./presupuesto";
import { Gasto, Ingreso } from "./Transaccion";

export interface DB {
  presupuestos: Presupuesto[];
  ingresos: Ingreso[];
  gastos: Gasto[];
}
