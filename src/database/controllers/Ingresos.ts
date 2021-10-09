import { initDatabase } from "@database/db";
import { Ingreso } from "@models/Transaccion";

export const createIngreso = async (ingreso: Ingreso): Promise<boolean> => {
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

export const deleteIngreso = async (ingreso: Ingreso): Promise<boolean> => {
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

export const updateIngreso = async (ingreso: Ingreso): Promise<boolean> => {
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

export const getIngreso = async (ingreso: Ingreso): Promise<boolean> => {
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
