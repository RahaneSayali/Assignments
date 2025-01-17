import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

import { Sequelize } from 'sequelize';
import app from './app';

const dbUrl = process.env.DATABASE_URL as string;
if (!dbUrl) {
    console.error('DATABASE_URL is not set in the environment variables');
    process.exit(1);  // Exit if DATABASE_URL is missing
  }

const sequelize = new Sequelize('weather_db', 'postgres', 'sayalipr', {
    host: 'localhost',
    dialect: 'postgres',
  });
  

  
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000'); 
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
