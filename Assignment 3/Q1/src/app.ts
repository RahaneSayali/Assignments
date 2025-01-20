import express from 'express';
import sequelize from "./db/config"
import bodyParser from "body-parser"  //for passing data in payload
import router from './routes/router';

const app =express()
app.use(express.json())
const PORT=8000

app.use(bodyParser.json());
app.use("/",router)


app.listen(PORT,()=>console.log("Server started"))

sequelize.sync({ force: false })  // Set to true to force drop/recreate the table (only for development)
  .then(() => {
    console.log('Weather table created (if it did not exist)');
  })
  .catch((error) => {
    console.error('Error creating weather table:', error);
  });