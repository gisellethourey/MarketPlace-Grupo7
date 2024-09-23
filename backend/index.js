import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './src/config/db.js'; 
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    // URL del frontend (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));

app.use(express.json());

// Rutas
app.use('/', userRoutes); 
app.use('/', productRoutes);
app.use('/', cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
