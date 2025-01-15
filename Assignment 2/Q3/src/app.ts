import express, { Request, Response } from "express";
import { filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge, students } from "./logic";

const app = express();
const port = 8005;

// Endpoint to filter passed students
app.get('/passed-students', (req: Request, res: Response) => {
  const passedStudents = filterPassedStudents(students);
  res.json(passedStudents);
});

// Endpoint to get student names
app.get('/student-names', (req: Request, res: Response) => {
  const studentNames = getStudentNames(students);
  res.json(studentNames);
});

// Endpoint to get students sorted by grade
app.get('/sorted-students', (req: Request, res: Response) => {
  const sortedStudents = sortStudentsByGrade(students);
  res.json(sortedStudents);
});

// Endpoint to get average age
app.get('/average-age', (req: Request, res: Response) => {
  const averageAge = getAverageAge(students);
  res.json({ averageAge });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
