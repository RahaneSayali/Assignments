"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableIfNotExists = void 0;
const pg_1 = require("pg");
// Function to check if a table exists
const doesTableExist = (client, tableName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT EXISTS (
      SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = $1
    );
  `;
    const result = yield client.query(query, [tableName]);
    return result.rows[0].exists;
});
// Function to create the table if it doesn't exist
const createTableIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        user: 'postgres', // Replace with your PostgreSQL username
        host: 'localhost', // Replace with your PostgreSQL host (localhost for local)
        database: 'my_database', // Replace with your database name
        password: 'sayalipr', // Replace with your PostgreSQL password
        port: 5432, // Default PostgreSQL port
    });
    try {
        yield client.connect();
        console.log('Connected to PostgreSQL');
        const tableName = 'users'; // Specify the table name you want to check
        // Check if the table exists
        const tableExists = yield doesTableExist(client, tableName);
        if (tableExists) {
            console.log(`Table "${tableName}" already exists.`);
        }
        else {
            // Create the table if it doesn't exist
            const createTableQuery = `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE
        );
      `;
            yield client.query(createTableQuery);
            console.log(`Table "${tableName}" has been created.`);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error creating table:', err.stack);
        }
        else {
            console.error('Unknown error occurred:', err);
        }
    }
    finally {
        yield client.end();
        console.log('Connection closed');
    }
});
exports.createTableIfNotExists = createTableIfNotExists;
