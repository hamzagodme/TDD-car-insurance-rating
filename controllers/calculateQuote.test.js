const { calculateQuote } = require("./calculateQuote.test");

describe("calculateQuote function", () => {
    console.log(calculateQuote);  

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    it("Vaild", () => {
        const req = { body: { car_value: 20000, risk_rating: 3 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            monthly_premium: 50.0,
            yearly_premium: 600.0,
        });
    });
    it("False", () => {
        const req = { body: { car_value: -5000, risk_rating: 3 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "bad input values" });
    });
    it("false", () => {
        const req = { body: { car_value: "twenty thousand", risk_rating: 3 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "bad input values" });
    });
    it("false", () => {
        const req = { body: { car_value: 20000, risk_rating: 0 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "bad input values" });
    });
    it("False", () => {
        const req = { body: { car_value: 20000, risk_rating: 6 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "bad input values" });
    });
    it("False", () => {
        const req = { body: { car_value: 20000, risk_rating: "high" } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "bad input values" });
    });
    it("Vaild", () => {
        const req = { body: { car_value: 100000000, risk_rating: 5 } };
        const res = mockResponse();
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            monthly_premium: 416666.67,
            yearly_premium: 5000000.0,
        });
    });
    it("vaild", () => {
        const req = { body: { car_value: 20000, risk_rating: 3 } };
        const res = mockResponse();
        jest.spyOn(Math, "round").mockImplementation(() => {
            throw new Error("It works !!!");
        });
        calculateQuote(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Calcute Things" });
        Math.round.mockRestore(); 
    });
});
