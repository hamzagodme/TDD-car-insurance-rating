const keywords = ["collide", "crash", "scratch", "bump", "smash"];

function calculateRiskRating(claimHistory) {
  if (!claimHistory || typeof claimHistory !== "string") {
    throw new Error("Invalid input: claim_history must be a non-empty string");
  }

  const lowerCaseHistory = claimHistory.toLowerCase();
  let riskRating = 0;

  for (const keyword of keywords) {
    const regex = new RegExp(keyword, "g");
    const matches = lowerCaseHistory.match(regex);
    if (matches) {
      riskRating += matches.length;
    }
  }

  return Math.min(riskRating, 5); // Cap the rating at 5
}

module.exports = { calculateRiskRating };
