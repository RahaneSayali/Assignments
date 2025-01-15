import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { arrayFunctions } from './logic';  // Importing the array functions from logic.ts

const app = express();
const port = 8005;

app.use(bodyParser.json());  // Middleware to parse JSON bodies

app.post('/array-functions',arrayFunctions)// Route handling for POST requests to '/array-functions'


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
