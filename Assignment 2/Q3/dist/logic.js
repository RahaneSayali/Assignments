"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = void 0;
exports.filterPassedStudents = filterPassedStudents;
exports.getStudentNames = getStudentNames;
exports.sortStudentsByGrade = sortStudentsByGrade;
exports.getAverageAge = getAverageAge;
// Sample array of students
exports.students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
// 1. Filter Passed Students
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}
// 2. Get Student Names
function getStudentNames(students) {
    return students.map(student => student.name);
}
// 3. Sort Students by Grade
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}
// 4. Get Average Age
function getAverageAge(students) {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
}
