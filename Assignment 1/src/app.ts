import express, { Request, Response } from 'express';
import { splitWords, concatenateWords, isLeapYear, secretHandshake } from './logic';

const app = express();
const port = 8005;

// 1. Split words API
app.get('/split/:datatype', (req: Request, res: Response) => {
    const inputString = req.params.datatype;
    const revisedString = splitWords(inputString);

    res.json({ revisedString });
});

// 2. Concatenate words API
app.get('/concatenate', (req: Request, res: Response) => {
    const { word1, word2 } = req.query;
    const revisedString = concatenateWords(word1 as string, word2 as string);

    res.json({ revisedString });
});

// 3. Leap year API
app.get('/leap/:year', (req: Request, res: Response) => {
    const year = parseInt(req.params.year);
    const result = isLeapYear(year);

    res.json({ isLeapYear: result });
});

// 4. Secret Handshake API
app.get('/handshake/:number', (req: Request, res: Response) => {
    const number = parseInt(req.params.number);
    const result = secretHandshake(number);

    res.json({ actions: result });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
