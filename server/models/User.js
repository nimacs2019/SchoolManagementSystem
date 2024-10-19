const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        role: {
            type: String,
            enum: ["student", "staff", "admin", "librarian"], 
        },
        staffID: {
            type: String,
            required: function () {
                return this.role === "staff" || this.role === "librarian";
            },
            unique: true,
            sparse: true, // Allows null values for non-staff users
        },
        // Additional fields for students
        name: {
            type: String,
            required: function () {
                return this.role === "student";
            },
        },
        class: {
            type: String,
            required: function () {
                return this.role === "student";
            },
        },
        address: {
            type: String,
            required: function () {
                return this.role === "student";
            },
        },
    },
    { timestamps: true }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare input password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
