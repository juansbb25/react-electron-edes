import { initDatabase, EnhancedDb } from "@database/initDb";
import { ServerResponse } from "@database/types";
import { Ingreso } from "src/models/Transaccion";
import { v4 as uuidv4 } from "uuid";

export type IngresoInput = Omit<Ingreso, "id">;

const obtainBase = (db: EnhancedDb) => {
  return db.chain.get("ingresos");
};

const obtainMontos = (ingreso: IngresoInput) => {
  return {
    ...ingreso,
    montoBeca: ingreso.montoCurso - ingreso.montoCancelar,
    porcentajeBeca:
      ingreso.montoCurso !== 0
        ? ((ingreso.montoCurso - ingreso.montoCancelar) / ingreso.montoCurso) *
          100
        : 0,
    saldo: ingreso.montoCancelar - ingreso.abono,
  };
};
export const createIngreso = async (
  ingreso: IngresoInput
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();

    // if (!presupuesto)
    //   return { state: false, message: "No existe la dimension" };
    const id = uuidv4();
    obtainBase(db)
      .push({ ...obtainMontos(ingreso), id })
      .value();

    await db.write();
    return { state: true };
  } catch (error) {
    console.debug(error);
    return { state: false };
  }
};

export const deleteIngreso = async (
  ingreso: Ingreso
): Promise<ServerResponse<Ingreso[]>> => {
  try {
    console.debug("eliminando ingreso con id", ingreso, ingreso.id);
    const db = await initDatabase();
    obtainBase(db).remove({ id: ingreso.id }).value();
    await db.write();
    return { state: true, values: db.data?.ingresos ? db.data.ingresos : [] };
  } catch (error) {
    console.error(error);
    return { state: false, values: [] };
  }
};

export const updateIngreso = async (
  ingreso: Ingreso
): Promise<ServerResponse<undefined>> => {
  try {
    const db = await initDatabase();
    const ingresoAnterior = db.chain
      .get("ingresos")
      .find({ id: ingreso.id })
      .value();
    if (!ingresoAnterior)
      return { state: false, message: "No existe el ingreso a actualizar" };
    const ingresos = db.chain.get("ingresos");
    ingresos.find({ id: ingreso.id }).assign(obtainMontos(ingreso)).value();
    await db.write();
    return { state: true };
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
