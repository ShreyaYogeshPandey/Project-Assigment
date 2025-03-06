// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import User from "./user.js"; // Import the User model from user.js

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database Connection
mongoose.connect("mongodb://localhost:27017/UserData")
    .then(() => console.log("Database connected")) // If the connection is successful
    .catch((error) => console.error("Database connection error:", error)); // If there is an error

const db = mongoose.connection;

// Event listener for successful database connection
db.on("open", () => console.log("Database connected"));

// Event listener for database connection errors
db.on("error", (error) => console.error("Database connection error:", error));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); // Log request details
    res.on("finish", () => console.log(`Response: ${res.statusCode}`)); // Log response status code
    next(); // Move to the next middleware
});

// Middleware to validate user data in request body
const validateUser = (req, res, next) => {
    const { firstName, lastName, hobby } = req.body;

    // If any required field is missing, return an error response
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({ message: "Missing required fields: firstName, lastName, hobby" });
    }

    next(); // Move to the next function
};

// Routes

// Get all users from the database
app.get("/users", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // If no user is found, return a 404 error
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user); // Return the found user
    } catch (error) {
        res.status(400).json({ message: "Invalid User ID", error: error.message });
    }
});

// Create a new user
app.post("/users", validateUser, async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new user from request data
        const savedUser = await newUser.save(); // Save user to database
        res.status(201).json(savedUser); // Return the saved user with status 201 (Created)
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message });
    }
});

// Update a user by ID
app.put("/users/:id", validateUser, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If user not found, return 404 error
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser); // Return the updated user
    } catch (error) {
        res.status(400).json({ message: "Invalid User ID", error: error.message });
    }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        // If user not found, return 404 error
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" }); // Return success message
    } catch (error) {
        res.status(400).json({ message: "Invalid User ID", error: error.message });
    }
});

// Start the server on port 1432
app.listen(1432, () => console.log("Server running on port 1432"));
