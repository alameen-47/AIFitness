import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server runnin on port ${PORT}`.bgCyan.white),
);
