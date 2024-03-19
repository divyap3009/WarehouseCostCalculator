const express = require("express");
const bodyParser = require("body-parser");
const { calculateFinalCost } = require("./finalCostCalculator");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Route for calculating final cost
app.post("/calculate-final-cost", (req, res) => {
  try {
    const order = req.body;
    const finalCost = calculateFinalCost(order);
    res.json({ finalCost });
  } catch (error) {
    console.error("Calculation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
