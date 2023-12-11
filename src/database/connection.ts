import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const port:unknown = process.env.DB_PORT;
const portNumber:number = port as number;

const createConnection = async () => {
    const client = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: portNumber
    });

    await client.connect();

    return client;
}

export { createConnection };