import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Presupuesto } from "@models/presupuesto";

type NotNeededKeysForCreation = "id" | "gastoTotal" | "ingresoTotal" | "total";

type PresupuestoInput = Omit<Presupuesto, NotNeededKeysForCreation>;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("presupuestos");
};

export const createPresupuesto = async (
  presupuesto: PresupuestoInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const exists = !!db.chain
      .get("presupuestos")
      .find({ code: presupuesto.code })
      .value();
    if (exists) return { state: false, message: "Ya existe este presupuesto" };
    obtainBase(db)
      .push({
        ...presupuesto,
        gastoTotal: 0,
        ingresoTotal: 0,
        total: 0,
      })
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
): Promise<ServerResponse<Presupuesto[]>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ code: presupuesto.code }).value();
    await db.write();
    return { state: true, values: db.data?.presupuestos || [] };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};

export const updatePresupuesto = async (
  presupuesto: Presupuesto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    db.chain
      .get("presupuestos")
      .find({ code: presupuesto.code })
      .assign({
        ...presupuesto,
        code: presupuesto.code.trim(),
        programa: presupuesto.programa.trim(),
        tipoPrograma: presupuesto.tipoPrograma.trim(),
      })
      .value();
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
      values: obtainBase(db)
        .value()
        .sort((iterator, iterator2) =>
          iterator.code.localeCompare(iterator2.code)
        ),
    };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};
