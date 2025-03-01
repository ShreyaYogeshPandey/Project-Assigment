import express from "express";  // Importing the Express framework

const app = express();  // Creating an instance of an Express application
app.use(express.json());  // Middleware to parse incoming JSON requests

// ---------------------- Logging Middleware ----------------------
// This middleware logs the request method and URL before passing it to the next middleware.
// It also logs the response status after the response is sent.
app.use((req, res, next) => {
    console.log('Request Method -', req.method);
    console.log('Request URL -', req.url);
    
    res.on("finish", () => {  // 'finish' event triggers after response is sent
        console.log("Response Status -", res.statusCode);
    });

    next(); // Pass control to the next middleware
});

// ---------------------- Validation Middleware ----------------------
// This middleware checks if the required fields (firstName, lastName, hobby) are present in the request body.
// If any field is missing, it sends a 400 Bad Request response.
const validateUser = (req, res, next) => {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({ message: "Missing required fields: firstName, lastName, and hobby are required." });
    }
    next(); // If validation passes, move to the next middleware or route handler
};

// ---------------------- Mock User Data ----------------------
// Sample in-memory user data
const users = [
    { "id": "1", "firstName": "Shreya", "lastName": "Pandey", "hobby": "Singing" },
    { "id": "2", "firstName": "Anupam", "lastName": "Singh", "hobby": "Writing" },
    { "id": "3", "firstName": "Mayuri", "lastName": "Jadhv", "hobby": "Reading" },
    { "id": "4", "firstName": "Shruti", "lastName": "Tiwari", "hobby": "Painting" },
    { "id": "5", "firstName": "Riya", "lastName": "Sukla", "hobby": "Dancing" }
];

// ---------------------- Routes ----------------------

// GET all users
app.get("/users", (req, res) => {
    res.json(users);  // Responds with the list of users
});

// GET a single user by ID
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found." });  // Return 404 if user doesn't exist
    }

    res.json(user);  // Return user data if found
});

// POST a new user
app.post("/user", validateUser, (req, res) => {
    const { firstName, lastName, hobby } = req.body;

    const newUser = {
        id: (Math.random() * 10).toFixed(2),  // Generates a random ID
        firstName,
        lastName,
        hobby,
    };

    users.push(newUser);  // Adds the new user to the list
    res.status(201).json(users);  // Returns updated user list with 201 Created status
});

// PUT (Update) an existing user
app.put("/user/:id", validateUser, (req, res) => {
    const userId = req.params.id;
    const selectedUser = users.find((user) => user.id === userId);

    if (!selectedUser) {
        return res.status(404).json({ message: "User with this ID does not exist." });  // Return 404 if user is not found
    }

    Object.assign(selectedUser, req.body);  // Update user data
    res.json(users);  // Return updated user list
});

// DELETE a user by ID
app.delete("/user/:id", (req, res) => {
    const userId = req.params.id;
    const selectedUser = users.find((user) => user.id === userId);

    if (!selectedUser) {
        return res.status(404).json({ message: "User with this ID does not exist." });  // Return 404 if user is not found
    }

    const filteredUsers = users.filter((user) => user.id !== userId);  // Remove user from the list
    res.json(filteredUsers);  // Return updated list of users
});

// ---------------------- Start the Server ----------------------
app.listen(5100, () => {
    console.log("Server is running on port 5100");  // Server starts on port 5100
});
