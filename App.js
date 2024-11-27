const express = require("express");
const app = express();
const riskRatingRoutes = require("./routes/riskRatingRoutes");

app.use(express.json()); // Middleware to parse JSON
app.use("/api", riskRatingRoutes); // Mount the routes

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
