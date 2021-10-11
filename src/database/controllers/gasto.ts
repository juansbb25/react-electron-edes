import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Gasto } from "src/models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type GastoInput = Omit<Gasto, "id">;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("gastos");
};

export const createGasto = async (
  gasto: GastoInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const exists = !!db.chain
      .get("presupuestos")
      .find({ code: gasto.dimension })
      .value();
    if (!exists) return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(db)
      .push({ ...gasto, id })
      .value();
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const deleteGasto = async (
  gasto: Gasto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ id: gasto.id });
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const updateGasto = async (
  gasto: Gasto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).find({ id: gasto.id }).assign(gasto);
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const getGastos = async (): Promise<ServerResponse<Gasto[]>> => {
  try {
    const db = await initDatabase();
    return {
      state: true,
      values: obtainBase(db).value(),
    };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};
