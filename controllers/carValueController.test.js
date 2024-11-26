// carValueController.test.js
const { calcCarValue } = require("./carValueController");

describe("Car Value based on model and year", () => {
  it("should return 6614 if model is Civic 2014", () => {
    expect(calcCarValue("Civic", 2014)).toBe(6614);
  });
  it("should return 2020 if model is 911 2020", () => {
    expect(calcCarValue(911, 2020)).toBe(2020);
  });
  it("should return an error if year is a string", () => {
    expect(() => calcCarValue("Atenza", "twenty twenty")).toThrow(
      "year should be a numeric value"
    );
  });
  it("should return an error if year is a number in string format", () => {
    expect(() => calcCarValue("Civic", "2014")).toThrow(
      "year should be a numeric value"
    );
  });
  it("should return 3413 if model is CK-100 2013", () => {
    expect(calcCarValue("CK-100", 2013)).toBe(3413 );
  });
});
