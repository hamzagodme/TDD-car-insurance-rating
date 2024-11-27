const express = require("express");
const { getRiskRating } = require("../controllers/riskRatingController");
const router = express.Router();

router.post("/risk-rating", getRiskRating);

module.exports = router;
