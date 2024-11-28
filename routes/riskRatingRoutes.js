const express = require("express");
const router = express.Router();
const riskRatingController = require("../controllers/riskRatingController");

router.post("/risk-rating", riskRatingController.getRiskRating);

module.exports = router;
