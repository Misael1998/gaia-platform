const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");

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
  console.log(req.body);
  res.send("request route");
};
