import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jobRoutes from './routes/jobs.js';
import errorHandler from './middleware/errorHandler.js';
import dns from 'dns';

dotenv.config()
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));