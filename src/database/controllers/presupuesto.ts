import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Presupuesto } from "@models/presupuesto";

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("presupuestos");
};

export const createPresupuesto = async (
  presupuesto: Presupuesto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const exists = !!db.chain
      .get("presupuestos")
      .find({ code: presupuesto.code })
      .value();
    if (exists) return { state: false, message: "Ya existe este presupuesto" };
    obtainBase(db)
      .push({ ...presupuesto })
      .value();
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const deletePresupuesto = async (
  presupuesto: Presupuesto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ code: presupuesto.code });
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const updatePresupuesto = async (
  presupuesto: Presupuesto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).find({ code: presupuesto.code }).assign(presupuesto);
    await db.write();
    return { state: true };
  } catch (error) {
    console.error(error);
    return { state: false };
  }
};

export const getPresupuestos = async (): Promise<
  ServerResponse<Presupuesto[]>
> => {
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
