import { Pool } from "pg";

const connectionString = "postgres://cauoqont:osm3S0lLEz6aEKbhgQBEbgaviUSx0m0c@castor.db.elephantsql.com/cauoqont";
const db = new Pool({ connectionString });

export default db;
