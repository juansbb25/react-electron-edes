import { JSONFile, Low } from "lowdb";
import lodash, { ObjectChain } from "lodash";
import { DB } from "src/models/DB";

//Important to add explict array in neew objects
export type EnhancedDb = Low<DB> & { chain: ObjectChain<DB> };
// Use JSON file for storage
export const initDatabase = async (): Promise<EnhancedDb> => {
  const adapter = new JSONFile<DB>("data/db.json");
  const db = new Low<DB>(adapter) as EnhancedDb;

  await db.read();
  // Read data from JSON file, this will set db.data content
  db.data ||= { presupuestos: [], ingresos: [], gastos: [] };
  const chain = lodash.chain(db.data);
  db.chain = chain;
  return db;
};
