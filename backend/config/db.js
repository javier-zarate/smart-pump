import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

let db;

export async function createConection() {
  // file path
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, "db.json");

  // configure lowdb to write to JSONFile
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  // If db.json doesn't exist, db.data will be null
  // Use the code below to set default data
  db.data = db.data || { users: [] };

  // write database content to file
  await db.write();
}

export const getConnection = () => db;
