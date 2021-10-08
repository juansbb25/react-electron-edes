import { Presupuesto } from "./presupuesto";

export interface DB {
  presupuesto: Presupuesto[];
  presupuestoCode: string[];
}
