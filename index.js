const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Function to maintain a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// First function to return food items (115ms delay)
const getFoodItems = async () => {
  await delay(115);
  return [
    { name: 'Goan Fish Curry', description: 'A spicy coconut-based curry with fish', price: 150 },
    { name: 'Chicken Xacuti', description: 'A rich, flavorful chicken curry', price: 180 }
  ];
};


// Second function to return food locations (2 minute delay)
const getFoodLocations = async () => {
    await delay(2 * 60 * 1000); // 2 minutes
    return {
      availableLocations: ['Panaji', 'Margao', 'Vasco', 'Mapusa'],
    };
  };

// Route to test second function
app.get('/food-locations', async (req, res) => {
    const locations = await getFoodLocations();
    res.json(locations);
  });




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
