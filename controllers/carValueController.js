// callback function for car value router
const getCarValue = async (req, res) => {
  try {
    model = req.body.model;
    year = req.body.year;
    amt = calcCarValue(model, year);
    res.json({ car_value: amt });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

/**
 **/
/** calcCarValue - calculates the value of a car
 * @param model
 * @param year
 * @returns the value of a car for a given model and year, formula used (model*100+year).
 */
function calcCarValue(model, year) {
  return modelValue(model) * 100 + year;
}

/**
 * modelValue - calculates the car model numeric value  based on its A-Z position
 * @param model
 * @returns numeric value of a car name 
 */
function modelValue(model) {
  carModel = model.toUpperCase();

  let carValue = 0;
  for (let i = 0; i < carModel.length; i++) {
    asciiValue = carModel.charCodeAt(i);
    position = asciiValue - 64;
    carValue = carValue + position;
  }
  return carValue;
}

module.exports = { calcCarValue, getCarValue };
