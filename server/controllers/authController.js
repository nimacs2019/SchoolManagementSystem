const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user (only for students)
exports.registerStudent = async (req, res) => {
    const { name, email, password, confirmPassword, role, class: studentClass, address, username } = req.body;
    console.log(req.body);

    try {
        // Allow registration only for students
        if (role !== "student") {
            return res.status(403).json({ message: "Registration is allowed only for students" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            class: studentClass, // Use renamed variable
            address,
            username,
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server error" });
    }
};

// Login user (for all roles)
exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body);

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("nkjnjnj", user.role);

        let isMatch = false;

        // Check password based on role
        if (user.role === "student") {
            console.log(`Stored hashed password: ${user.password}`);
            console.log(`Password to compare: ${password}`);

            isMatch = await bcrypt.compare(password, user.password);
            console.log(`Password match result: ${isMatch}`);
        } else if (["admin", "staff", "librarian"].includes(user.role)) {
            isMatch = password === user.password;
            console.log(`Comparing plain text password: '${password}' with '${user.password}' => Match: ${isMatch}`);
        } else {
            return res.status(400).json({ message: "Invalid role or credentials" });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
