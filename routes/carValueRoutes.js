const express = require("express");
const router = express.Router();
const carValueController=require('../controllers/carValueController')


router.post('/carvalue',carValueController.getCarValue)





module.exports = router;