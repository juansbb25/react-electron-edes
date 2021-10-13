import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Ingreso } from "src/models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type IngresoInput = Omit<Ingreso, "id">;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("ingresos");
};

export const createIngreso = async (
  ingreso: IngresoInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const exists = !!db.chain
      .get("presupuestos")
      .find({ code: ingreso.dimension })
      .value();
    if (!exists) return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(db)
      .push({ ...ingreso, id })
      .value();
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const deleteIngreso = async (
  ingreso: Ingreso
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ id: ingreso.id });
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const updateIngreso = async (
  ingresos: Ingreso[]
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    if (db.data) {
      db.data.ingresos = ingresos;
      await db.write();
      return { state: true };
    } else throw Error("Bad structure in data");
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const getIngresos = async (): Promise<ServerResponse<Ingreso[]>> => {
  try {
    const db = await initDatabase();
    return {
      state: true,
      values: obtainBase(db).value(),
    };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};
