import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extented: true }));

app.use('/api/auth', userRouter);

app.listen(PORT, () => {
    console.log("server is running");
})