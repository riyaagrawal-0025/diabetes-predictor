import express from 'express';
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extented: true }));

app.listen(PORT, () => {
    console.log("server is running");
})