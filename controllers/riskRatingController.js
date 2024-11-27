const { calculateRiskRating } = require("../models/riskRatingModel");

const getRiskRating = (req, res) => {
  try {
    const { claim_history } = req.body;
    const riskRating = calculateRiskRating(claim_history);
    res.status(200).json({ risk_rating: riskRating });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getRiskRating };
