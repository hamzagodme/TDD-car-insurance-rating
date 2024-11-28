const keywords = ["collide", "crash", "scratch", "bump", "smash"];
// const wordsToNumbers = {
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   six: 6,
//   seven: 7,
//   eight: 8,
//   nine: 9,
//   zero: 0,
// };

function calculateRiskRating(claimHistory) {
  if (!claimHistory || typeof claimHistory !== "string") {
    throw new Error("Invalid input: claim_history must be a non-empty string");
  }

  const lowerCaseHistory = claimHistory.toLowerCase();
  let riskRating = 0;
  const digitRegex = new RegExp(/[0-9]+/, "g");
  const occurances = lowerCaseHistory.match(digitRegex) || ["0"];
  console.log(occurances);

  // @ ?.map ensures that map() is only called if occurances is not null or undefined.
  // @ If occurances is valid, map() will process its elements.
  const totalOccurances = occurances
    ?.map((occuranceDetection) => Number.parseInt(occuranceDetection))
    .reduce((acc, currentValue) => acc + currentValue, 0);
  for (const keyword of keywords) {
    const regex = new RegExp(keyword, "g");
    const matches = lowerCaseHistory.match(regex);
    if (matches) {
      riskRating += matches.length;
    }
  }

  if (riskRating) {
    riskRating += totalOccurances;
  }

  console.log("Calculated risk rating before cap:", riskRating);

  return Math.min(riskRating, 5); // Cap the rating at 5
}

module.exports = { calculateRiskRating };
