// Sample array of students
export const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
  ];
  
  // 1. Filter Passed Students
  export function filterPassedStudents(students: { name: string; age: number; grade: number }[]) {
    return students.filter(student => student.grade >= 50);
  }
  
  // 2. Get Student Names
  export function getStudentNames(students: { name: string; age: number; grade: number }[]) {
    return students.map(student => student.name);
  }
  
  // 3. Sort Students by Grade
  export function sortStudentsByGrade(students: { name: string; age: number; grade: number }[]) {
    return students.slice().sort((a, b) => a.grade - b.grade);
  }
  
  // 4. Get Average Age
  export function getAverageAge(students: { name: string; age: number; grade: number }[]) {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
  }
  