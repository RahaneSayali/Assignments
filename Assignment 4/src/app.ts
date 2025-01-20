import express,{Request , Response} from 'express'

const app = express();
const PORT=8000;

app.use(express.json());


app.use((err: any, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });