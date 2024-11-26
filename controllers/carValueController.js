// callback function for car value router
const getCarValue = async (req, res) => {
  try {
    model = req.body.model;
    year = req.body.year;
    amt = calcCarValue(model, year);
    res.json({ car_value: amt });
  } catch (err) {
    res.json({ error: err });
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
  if (isNaN(year) || typeof year === "string")
    throw "year should be a numeric value";

  if (!isNaN(model)) return year;
  else {
    return modelValue(model) * 100 + year;
  }
}

/**
 * modelValue - calculates the car model numeric value  based on its A-Z position
 * @param model
 * @returns numeric value of a car name
 */
function modelValue(model) {
  // if carModel includes ("#!@$%^^&*")
  carModel = model.toUpperCase();
  let carValue = 0;
  for (let i = 0; i < carModel.length; i++) {
    asciiValue = carModel.charCodeAt(i);
    if (asciiValue > 64 && asciiValue < 91) {
      position = asciiValue - 64;
      carValue = carValue + position;
    }
  }
  return carValue;
}

module.exports = { calcCarValue, getCarValue };
