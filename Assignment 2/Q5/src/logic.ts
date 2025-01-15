import { Client } from 'pg';

// Function to check if a table exists
const doesTableExist = async (client: Client, tableName: string) => {
  const query = `
    SELECT EXISTS (
      SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = $1
    );
  `;
  const result = await client.query(query, [tableName]);
  return result.rows[0].exists;
};

// Function to create the table if it doesn't exist
export const createTableIfNotExists = async () => {
  const client = new Client({
    user: 'postgres',       
    host: 'localhost',     
    database: 'my_database', 
    password: 'sayalipr', 
    port: 5432,            
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const tableName = 'users';  
    
    // Check if the table exists
    const tableExists = await doesTableExist(client, tableName);

    if (tableExists) {
      console.log(`Table "${tableName}" already exists.`);
    } else {
      // Create the table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE
        );
      `;
      await client.query(createTableQuery);
      console.log(`Table "${tableName}" has been created.`);
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating table:', err.stack);
    } else {
      console.error('Unknown error occurred:', err);
    }
  } finally {
    await client.end();
    console.log('Connection closed');
  }
};
