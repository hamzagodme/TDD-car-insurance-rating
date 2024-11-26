// carValueController.test.js
const { calcCarValue } = require("./carValueController");

describe("Car Value based on model and year", () => {
  it("should return 6614 if model is Civic 2014", () => {
    expect(calcCarValue("Civic", 2014)).toBe(6614);
  });
});
