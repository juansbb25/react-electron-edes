import { Low, JSONFile } from "lowdb";
import { TDatabaseState } from "./types";

// Use JSON file for storage
export const initDatabase = async (): Promise<Low<TDatabaseState>> => {
  const adapter = new JSONFile<TDatabaseState>("db.json");
  const db = new Low<TDatabaseState>(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();
  db.data ||= { name: "hola" };
  console.debug("database iniciada", db);
  await db.write();
  console.debug("database iniciada", db);
  return db;
};
