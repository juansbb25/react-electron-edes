import { initDatabase } from "@database/db";
import { Ingreso } from "@models/Transaccion";

export const create = async (ingreso: Ingreso): Promise<boolean> => {
  try {
    const db = await initDatabase();
    db.chain.set(["presupuesto", ingreso.dimension, "ingreso"], ingreso);
    await db.write();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
