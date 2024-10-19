// routes/authRoutes.js
const express = require("express");
const { registerStudent, loginUser } = require("../controllers/authController");
const Authrouter = express.Router();

Authrouter.post("/api/register", registerStudent);
Authrouter.post("/api/login", loginUser);

module.exports = Authrouter;
