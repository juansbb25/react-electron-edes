export interface Presupuesto {
  code: string;
  initValue: number;
  programa: string;
  gastoTotal: number;
  ingresoTotal: number;
  total: number;
  tipoPrograma: string;
  responsable: string;
  rubros: { name: string; initValue: number }[];
}
