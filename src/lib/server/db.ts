import * as schema from "./schemas";

import { drizzle } from "drizzle-orm/node-postgres";

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.DB_URL,
    ssl: false,
  },
  schema,
});

export default db;
