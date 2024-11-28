const { calculateRiskRating } = require("../models/riskRatingModel");

exports.getRiskRating = (req, res) => {
  const { claim_history } = req.body;

  // Validate input
  if (
    !claim_history ||
    typeof claim_history !== "string" ||
    !claim_history.trim()
  ) {
    return res.status(400).json({
      error: "Invalid input: claim_history must be a non-empty string",
    });
  }

  const riskRating = calculateRiskRating(claim_history);
  res.status(200).json({ risk_rating: riskRating });
};
