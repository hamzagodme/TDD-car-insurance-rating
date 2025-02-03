const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = express.Router();
const app = express();

const carValueRoutes = require("./routes/carValueRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const riskRatingRoutes = require("./routes/riskRatingRoutes");

// Test route
apiRouter.get("/test", (req, res) => {
  res.send("Hello, world!");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
apiRouter.use(carValueRoutes);
apiRouter.use(quoteRoutes);
apiRouter.use(riskRatingRoutes);

// Prefix all routes with "/api"
app.use("/api", apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server
const PORT = 35412;
app.listen(PORT, () => {
  console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});

module.exports = app;
