import { Presupuesto } from "./presupuesto";
import { Gasto, Ingreso, Rubro } from "./Transaccion";

export interface DB {
  presupuestos: Presupuesto[];
  ingresos: Ingreso[];
  gastos: Gasto[];
  rubros: Rubro[];
}
