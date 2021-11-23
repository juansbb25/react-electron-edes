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
  return {
    ...gasto,
    valorConIva: gasto.valorSinIva * (1 + gasto.iva / 100),
  };
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
    //if (!exists) return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(db)
      .push({ ...obtainValorConIva(gasto), id })
      .value();
    if (exists) {
      obtainBasePresupuesto(db)
        .find({ code: gasto.dimension })
        .assign({
          gastoTotal:
            presupuesto.gastoTotal + obtainValorConIva(gasto).valorConIva,
          total: presupuesto.total - obtainValorConIva(gasto).valorConIva,
        })
        .value();
    }

    await db.write();
    return { state: true };
  } catch (error) {
    console.debug("error creando----", error);
    return { state: false };
  }
};

export const deleteGasto = async (
  gasto: Gasto
): Promise<ServerResponse<Gasto[]>> => {
  try {
    const db = await initDatabase();
    obtainBase(db).remove({ id: gasto.id }).value();
    const presupuesto = db.chain
      .get("presupuestos")
      .find({ code: gasto.dimension })
      .value();
    if (presupuesto) {
      obtainBasePresupuesto(db)
        .find({ code: gasto.dimension })
        .assign({
          gastoTotal: presupuesto.gastoTotal - gasto.valorConIva,
          total: presupuesto.total + gasto.valorConIva,
        })
        .value();
    }
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
    console.debug("gasto", gasto);
    const db = await initDatabase();
    const gastoAnterior = db.chain.get("gastos").find({ id: gasto.id }).value();
    if (!gastoAnterior)
      return { state: false, message: "No existe el gasto a actualizar" };

    const presupuesto = db.chain
      .get("presupuestos")
      .find({ code: gasto.dimension })
      .value();

    if (!presupuesto)
      return { state: false, message: "No existe la dimensión" };

    const gastos = db.chain.get("gastos");
    gastos.find({ id: gasto.id }).assign(obtainValorConIva(gasto)).value();
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
      values: obtainBase(db)
        .value()
        .sort((iterator, iterator2) =>
          iterator.fecha > iterator2.fecha ? -1 : 1
        ),
    };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};
