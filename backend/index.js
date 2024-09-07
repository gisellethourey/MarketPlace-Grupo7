import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api', productRoutes);
app.use('/api', userRoutes); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server on 🔥 http://localhost:${PORT}`);
});