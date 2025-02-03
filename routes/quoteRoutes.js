const express = require('express');
const router = express.Router();

router.post('/quote', (req, res) => {
    const { car_value, risk_rating } = req.body;

    if (typeof car_value !== 'number' || car_value <= 0 || typeof risk_rating !== 'number' || risk_rating < 1 || risk_rating > 5) {
        return res.status(400).json({ error: "bad input values" });
    }
    const yearly_premium = (car_value * risk_rating) / 100;
    const monthly_premium = yearly_premium / 12;
    res.status(200).json({
        monthly_premium: parseFloat(monthly_premium.toFixed(2)),
        yearly_premium: parseFloat(yearly_premium.toFixed(2)),
    });
});

module.exports = router;
