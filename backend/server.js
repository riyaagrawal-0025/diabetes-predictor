import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/auth.routes.js';
import diabetesRouter from './routes/diabetes.routes.js'

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRouter);
app.use('/api/diabetes', diabetesRouter);

app.listen(PORT, () => {
    console.log("server is running");
})