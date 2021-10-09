import { JSONFile, Low } from "lowdb";
import lodash, { ObjectChain } from "lodash";
import { DB } from "@models/DB";

export type EnhancedDb = Low<DB> & { chain: ObjectChain<DB> };
// Use JSON file for storage
export const initDatabase = async (): Promise<EnhancedDb> => {
  const adapter = new JSONFile<DB>("db.json");
  const db = new Low<DB>(adapter) as EnhancedDb;

  await db.read();
  // Read data from JSON file, this will set db.data content
  db.data ||= { presupuesto: [], presupuestoCode: [] };
  const chain = lodash.chain(db.data);
  db.chain = chain;
  return db;
};