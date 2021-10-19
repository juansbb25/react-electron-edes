import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Gasto } from "src/models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type GastoInput = Omit<Gasto, "id">;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("gastos");
};
const obtainBasePresupuesto = (db: EnhancedDb) => {
  return db.chain.get("presupuestos");
};
const obtainValorConIva = (gasto: GastoInput) => {
  return { ...gasto, valorConIva: gasto.valorSinIva * (1 + gasto.iva / 100) };
};
export const createGasto = async (
  gasto: GastoInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const presupuesto = obtainBasePresupuesto(db)
      .find({ code: gasto.dimension })
      .value();
    const exists = !!presupuesto;
    if (!exists) return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(db)
      .push({ ...obtainValorConIva(gasto), id })
      .value();
    obtainBasePresupuesto(db)
      .find({ code: gasto.dimension })
      .assign({
        gastoTotal: presupuesto.gastoTotal - gasto.valorConIva,
        total: presupuesto.total - gasto.valorConIva,
      })
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
): Promise<ServerResponse<Gasto[]>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ id: gasto.id }).value();
    await db.write();
    return { state: true, values: db.data?.gastos || [] };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};

export const updateGasto = async (
  gasto: Gasto
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const existDimension = () => {
      const presupuestos = db.chain.get("presupuestos");
      if (presupuestos.find({ code: gasto.dimension }).value()) return true;
      else return false;
    };
    if (existDimension()) {
      const gastos = db.chain.get("gastos");
      gastos
        .find({ dimension: gasto.dimension })
        .assign(obtainValorConIva(gasto))
        .value();
      await db.write();
      return { state: true };
    } else return { state: false, message: "No existe la dimensión" };
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
    return { state: false, values: [] };
  }
};
