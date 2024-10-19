// routes/authRoutes.js
const express = require("express");
const { getStudentsDetails, addNewStudent, updateStudent, deleteStudent } = require("../controllers/studentController");
const Studentrouter = express.Router();

Studentrouter.get("/api/students", getStudentsDetails);
Studentrouter.post("/api/students", addNewStudent);
Studentrouter.put("/api/students/:id", updateStudent);
Studentrouter.delete("/api/students/:id", deleteStudent);

module.exports = Studentrouter;
