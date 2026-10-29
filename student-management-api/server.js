require("dotenv").config();
// then you can access
// process.env.PORT
// process.env.MONGO_URI

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const app = express(); //Express application.
// app is the object used to define routes, middleware, and server behavior.

// Middleware to read JSON request bodies
app.use(express.json());  //parses incoming JSON request bodies.
//After parsing, the request data becomes available through req.body

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management API is running",
  });
});

// 1. CREATE - Add a student
// This is an asynchronous callback function.
// Database operations can take time. The async keyword allows you to use await inside the function.
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Roll number already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 2. READ - Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// 3. SEARCH - Search by name or roll number
app.get("/api/students/search", async (req, res) => {
  try {
    const { name, rollNumber } = req.query;

    if (!name && !rollNumber) {
      return res.status(400).json({
        message: "Provide name or rollNumber to search",
      });
    }

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (rollNumber) {
      filter.rollNumber = {
        $regex: rollNumber,
        $options: "i",
      };
    }

    const students = await Student.find(filter);

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// READ - Get one student by MongoDB ID
app.get("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// 4. UPDATE - Update a student by MongoDB ID
app.put("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Roll number already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 5. DELETE - Delete a student by MongoDB ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Start server after MongoDB connects
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
