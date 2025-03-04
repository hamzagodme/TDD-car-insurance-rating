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

/** calcCarValue - calculates the value of a car
 * @param model
 * @param year
 * @returns the value of a car for a given model and year, formula used (model*100+year).
 */
function calcCarValue(model, year) {
  if (yearValidation(year)) {
    if (!isNaN(model)) return year;
    if (/[^a-zA-Z0-9\s-]/.test(model))
      throw "Model should not contain special characters";
    else {
      return modelValue(model) * 100 + year;
    }
  }
}
/**
 * modelValue - calculates the car model numeric value by adding up the positions of alphabets of the letters in the name based on its A-Z position
 * @param model
 * @returns numeric value of a car name
 */
function modelValue(model) {
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

function yearValidation(year) {
  if (isNaN(year) || typeof year === "string")
    throw "year should be a numeric value";
  if ((year > 2024) || (year < 2004))
    throw "Only cars purchased between Year(2004-2024) can be insured";
  else {
    return true
  }
};


module.exports = { calcCarValue, getCarValue };
