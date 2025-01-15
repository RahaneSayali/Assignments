"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_1 = require("./logic");
const app = (0, express_1.default)();
const port = 8005;
// Endpoint to filter passed students
app.get('/passed-students', (req, res) => {
    const passedStudents = (0, logic_1.filterPassedStudents)(logic_1.students);
    res.json(passedStudents);
});
// Endpoint to get student names
app.get('/student-names', (req, res) => {
    const studentNames = (0, logic_1.getStudentNames)(logic_1.students);
    res.json(studentNames);
});
// Endpoint to get students sorted by grade
app.get('/sorted-students', (req, res) => {
    const sortedStudents = (0, logic_1.sortStudentsByGrade)(logic_1.students);
    res.json(sortedStudents);
});
// Endpoint to get average age
app.get('/average-age', (req, res) => {
    const averageAge = (0, logic_1.getAverageAge)(logic_1.students);
    res.json({ averageAge });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
