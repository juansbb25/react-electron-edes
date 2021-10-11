import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Ingreso } from "src/models/Transaccion";
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
): Promise<ServerResponse> => {
  try {
    const db = await initDatabase();
    const exists = !!db.chain
      .get("presupuestoCode")
      .find(ingreso.dimension)
      .value();
    console.debug("exists", exists);
    if (!exists) return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(ingreso, db)
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
): Promise<ServerResponse> => {
  try {
    const db = await initDatabase();
    obtainBase(ingreso, db).remove({ id: ingreso.id });
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const updateIngreso = async (
  ingreso: Ingreso
): Promise<ServerResponse> => {
  try {
    const db = await initDatabase();
    obtainBase(ingreso, db).find({ id: ingreso.id }).assign(ingreso);
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const getIngresos = async (
  ingreso: Ingreso
): Promise<ServerResponse> => {
  try {
    const db = await initDatabase();
    return {
      state: true,
      values: obtainBase(ingreso, db).push(ingreso).value(),
    };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};
