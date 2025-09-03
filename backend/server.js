import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
const app = express();

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extented: true }));




app.listen(PORT, () => {
    console.log("server is running");
})