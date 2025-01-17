import express from 'express';
import sequelize from "./db/config"
import bodyParser from "body-parser"
import router from './routes/router';

const app =express()
app.use(express.json())
const PORT=8000

app.use(bodyParser.json());
app.use("/",router)


app.listen(PORT,()=>console.log("Server started"))