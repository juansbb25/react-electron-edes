import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Rubro } from "src/models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type RubroInput = Omit<Rubro, "id">;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("rubros");
};

export const createRubro = async (
  rubro: RubroInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const id = uuidv4();
    obtainBase(db)
      .push({ ...rubro, id })
      .value();
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const deleteRubro = async (
  rubro: Rubro
): Promise<ServerResponse<Rubro[]>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ id: rubro.id }).value();
    await db.write();
    return { state: true, values: db.data?.rubros || [] };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};

export const updateRubros = async (
  rubros: Rubro[]
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    if (db.data) {
      db.data.rubros = rubros;
      await db.write();
      return { state: true };
    } else throw Error("Bad structure in data");
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const getRubros = async (): Promise<ServerResponse<Rubro[]>> => {
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
