const express = require("express");

const app = express();

const PORT = 5000;

// Middleware to read JSON data
app.use(express.json());


// Temporary student data
let students = [
    {
        id: 1,
        name: "Harshal",
        rollNo: "101",
        email: "harshal@gmail.com",
        branch: "IT"
    },
    {
        id: 2,
        name: "Rahul",
        rollNo: "102",
        email: "rahul@gmail.com",
        branch: "CSE"
    }
];


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
    res.json({
        message: "Student CRUD API is running"
    });
});


// ========================================
// CREATE STUDENT
// POST /students
// ========================================

app.post("/students", (req, res) => {

    const { name, rollNo, email, branch } = req.body;

    const newStudent = {
        id: students.length + 1,
        name: name,
        rollNo: rollNo,
        email: email,
        branch: branch
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});


// ========================================
// READ ALL STUDENTS
// GET /students
// ========================================

app.get("/students", (req, res) => {

    res.json(students);

});


// ========================================
// READ ONE STUDENT
// GET /students/:id
// ========================================

app.get("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);

});


// ========================================
// SEARCH STUDENT
// GET /students/search?name=Harshal
// ========================================

app.get("/students/search", (req, res) => {

    const name = req.query.name;

    const results = students.filter(student =>
        student.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(results);

});


// ========================================
// UPDATE STUDENT
// PUT /students/:id
// ========================================

app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, rollNo, email, branch } = req.body;

    student.name = name;
    student.rollNo = rollNo;
    student.email = email;
    student.branch = branch;

    res.json({
        message: "Student updated successfully",
        student: student
    });

});


// ========================================
// DELETE STUDENT
// DELETE /students/:id
// ========================================

app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});