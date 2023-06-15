import express from "express";
import "./config/database.js"; // Import the database.js file
import authRoutes from "./app/routes/authRoutes.js";
import userRoutes from "./app/routes/userRoutes.js";
const app = express();
const port = 3000; // Choose the port number you prefer

// Middleware
app.use(express.json()); // Body parsing middleware to parse JSON requests
// Add any additional middleware you need, such as logging or CORS handling

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// Add any other routes you need
app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
