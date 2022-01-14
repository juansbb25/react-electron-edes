export interface Transaction {
  id: string;
  dimension: string;
  fecha: Date;
  factura: string;
  proveedor?: string; //talves solo en gastos obligatorio
  ciudad?: string; //talves solo en ingresos obligatorio
  observacion?: string;
  programa?: string;
}

export interface Ingreso extends Transaction {
  empresa?: string;
  cedula: string; //talves no es requerida
  correo?: string;
  montoCurso: number;
  porcentajeBeca: number;
  montoCancelar: number;
  montoBeca: number;
  abono: number;
  saldo: number;
  numBoucher?: string; //podria ser number
  numDeposito?: string; //podria ser number
  transferencia?: string;
}

export interface Gasto extends Transaction {
  categoria?: string;
  iva: number;
  valorConIva: number;
  valorSinIva: number;
  req: string;
  responsable: string;
}
export interface Rubro {
  id: string;
  nombre: string;
}
