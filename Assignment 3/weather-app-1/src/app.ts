import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/WeatherRoutes';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', weatherRoutes);

export default app;
