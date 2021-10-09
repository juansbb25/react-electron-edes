import { initDatabase, EnhancedDb } from "@database/initDb";
import { Ingreso } from "@models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type IngresoInput = Omit<Ingreso, "id">;

const obtainBase = (ingreso: IngresoInput, db: EnhancedDb) => {
  return db.chain
    .get("presupuesto")
    .find({ code: ingreso.dimension })
    .get("ingresos");
};

export const createIngreso = async (
  ingreso: IngresoInput
): Promise<boolean> => {
  try {
    const db = await initDatabase();
    const id = uuidv4();
    obtainBase(ingreso, db).push({ ...ingreso, id });
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
    obtainBase(ingreso, db).remove({ id: ingreso.id });
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
    obtainBase(ingreso, db).find({ id: ingreso.id }).assign(ingreso);
    await db.write();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getIngresos = async (
  ingreso: Ingreso
): Promise<Ingreso[] | false> => {
  try {
    const db = await initDatabase();
    return obtainBase(ingreso, db).push(ingreso).value();
  } catch (error) {
    console.error(error);
    return false;
  }
};
