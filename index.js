const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Function to maintain a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// First function to return food items (115ms delay)
const getFoodItems = async () => {
  await delay(115);
  return [
    {
      name: "Goan Fish Curry",
      description: "A spicy coconut-based curry with fish",
      price: 150,
    },
    {
      name: "Chicken Xacuti",
      description: "A rich, flavorful chicken curry",
      price: 180,
    },
  ];
};

// Second function to return food locations (2 minute delay)
const getFoodLocations = async () => {
  await delay(2 * 60 * 1000); // 2 minutes
  return {
    availableLocations: ["Panaji", "Margao", "Vasco", "Mapusa"],
  };
};

// Third function to return food nutritional information (300ms delay)
const getNutritionalInfo = async () => {
  await delay(300);
  return [
    { name: "Goan Fish Curry", calories: 250, protein: 20, fat: 10 },
    { name: "Chicken Xacuti", calories: 300, protein: 25, fat: 12 },
  ];
};

// Fourth function to return stock-out foods (100ms delay)
const getStockOutFoods = async () => {
  await delay(100);
  return {
    stockOut: ["Pork Vindaloo"],
  };
};

// API route to get the merged food data
app.get("/food-details", async (req, res) => {
  try {
    const [foodItems, foodLocations, nutritionalInfo, stockOutFoods] =
      await Promise.all([
        getFoodItems(),
        getFoodLocations(),
        getNutritionalInfo(),
        getStockOutFoods(),
      ]);

    const foodDetails = {
      foodItems,
      foodLocations,
      nutritionalInfo,
      stockOutFoods,
    };

    res.json(foodDetails);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
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
