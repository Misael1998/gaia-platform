const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const moment = require("moment");

//@desc     insert order into DB
//@route    post     /api/data/products
//@access   Private
exports.request = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validation errors", errors.array(), res);
  }
  const {
    emissionDate,
    shipping,
    requestType,
    deliveryType,
    products
  } = req.body;

  isDateValid = moment(emissionDate).isValid();

  if (!isDateValid) {
    return errorResponse(
      400,
      "Validation errors",
      { msg: "invalid date" },
      res
    );
  }

  console.log(req.body);
  res.send("request route");
};
