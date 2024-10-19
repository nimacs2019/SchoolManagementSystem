const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Fetch all students


const getStudentsDetails = async (req, res) => {
    try {
        const students = await User.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new student

const addNewStudent = async (req, res) => {
    const student = new User(req.body);
    try {
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing student
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await User.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStudentsDetails,addNewStudent, deleteStudent, updateStudent };
