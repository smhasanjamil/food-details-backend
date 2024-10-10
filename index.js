const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Food Details Backend!");
});

// Define a port
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
