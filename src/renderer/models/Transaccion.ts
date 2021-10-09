export interface Transaction {
  id: string;
  dimension: string;
  programa: string;
  fecha: Date;
  factura: string;
  proveedor?: string; //talves solo en gastos obligatorio
  responsable?: "FEDES" | "UTPL"; //talves solo en gastos obligatorio
  ciudad?: string; //talves solo en ingresos obligatorio
  observacion?: string;
}

export interface Ingreso extends Transaction {
  empresa?: string;
  cedula: string; //talves no es requerida
  correo?: string;
  montoCurso: number;
  porcentajeBeca: number;
  montoBeca: number;
  abono: number;
  saldo: number;
  numBoucher?: string; //podria ser number
  numDeposito?: string; //podria ser number
  transferencia?: string;
  observacion?: string;
}

export interface Gasto extends Transaction {
  categoria?: string;
  subCategoria?: string;
  iva: number;
  valorConIva: number;
  valorSinIva: number;
  req: string;
}
