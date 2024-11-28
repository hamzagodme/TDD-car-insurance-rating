const request = require("supertest");
const app = require("../server");

// Test Cases
// Test Description --> Input (claim_history) --> Expected Output
// 1    Sunny day scenario --> "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." --> { "risk_rating": 3 }
// 2	Multiple keywords --> "I bumped another car and scratched my fender." --> { "risk_rating": 2 }
// 3	No keywords --> "There was no damage and no collision." --> { "risk_rating": 0 }
// 4	Empty input --> "" --> { "error": "Invalid input: claim_history must be a non-empty string" }
// 5	Null input --> null --> { "error": "Invalid input: claim_history must be a non-empty string" }
// 6	Case-insensitivity test --> "Crash crash CRASH!!!" --> { "risk_rating": 3 }
// 7	All different keywords --> "I collided with another car, smashed my bumper, and crashed into a pole. Such a bad day!" --> { "risk_rating": 4 }
// 8	Exceeds maximum risk rating (capped at 5) --> "I crashed my car 10 times this year." --> { "risk_rating": 5 }
// 9	Negative: Input is a number --> 12345 --> { "error": "Invalid input: claim_history must be a non-empty string" }

describe("Claim History to Risk Rating API", () => {
  test("Sunny day scenario", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history:
        "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 3 });
  });

  test("Multiple keywords", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: "I bumped another car and scratched my fender.",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 2 });
  });

  test("No keywords", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: "There was no damage and no collision.",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 0 });
  });

  test("Empty input", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input: claim_history must be a non-empty string",
    });
  });

  test("Null input", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: null,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input: claim_history must be a non-empty string",
    });
  });

  test("Case-insensitivity test", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: "Crash crash CRASH!!!",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 3 });
  });

  test("All different keywords", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history:
        "I collided with another car, smashed my bumper, scratched the rims and crashed into a pole. Such a bad day!",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 5 });
  });

  test("Exceeds maximum risk rating", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: "I crashed my car 10 times this year.",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ risk_rating: 5 });
  });

  test("Negative: Input is a number", async () => {
    const response = await request(app).post("/api/risk-rating").send({
      claim_history: 12345,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid input: claim_history must be a non-empty string",
    });
  });
});
