const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const moment = require("moment");
const mssql = require("mssql");

//@desc     insert order into DB
//@route    post     /api/data/products
//@access   Private
exports.request = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validation errors", errors.array(), res);
  }
  const { emissionDate, shipping, requestType, deliveryType } = req.body;
  let products = req.body.products.map(product => {
    if (product.quantity < 1 || product.quantity === null) {
      return errorResponse(
        400,
        "Validation errors",
        [{ msg: "Quantity value in products must be a number greater than 0" }],
        res
      );
    }
    tmp = {
      product: product.product,
      quantity: product.quantity,
      inserted: false
    };
    return tmp;
  });
  try {
    let userType = [];
    const { userId, role } = req.user;
    if (role === "individual") {
      userType = [null, userId];
    }
    if (role === "enterprise") {
      userType = [userId, null];
    }

    const request = await new mssql.Request()
      .input("deliveryID", mssql.Int, deliveryType)
      .input("requestTypeID", mssql.Int, requestType)
      .input("date", mssql.DateTime, emissionDate)
      .input("shipping", mssql.Float, shipping)
      .input("eClientID", mssql.Int, userType[0])
      .input("iClientID", mssql.Int, userType[1])
      .output("msj", mssql.VarChar(100))
      .output("err", mssql.VarChar(100))
      .output("id", mssql.Int)
      .execute("SP_INSERT_REQUEST");

    const { msj } = request.output;
    if (msj !== "success") {
      return errorResponse(400, "Bad request", [{ msj: msj }], res);
    }

    for (let product of products) {
      if (!product.inserted) {
        const productsRequest = await new mssql.Request()
          .input("productId", mssql.Int, product.product)
          .input("requestId", mssql.Int, request.output.id)
          .input("quantity", mssql.Int, product.quantity)
          .output("msj", mssql.VarChar(100))
          .output("err", mssql.VarChar(100))
          .execute("SP_INSERT_PRODUCTS_IN_ORDER");
        if (productsRequest.output.msj === "success") {
          product.inserted = true;
        }
      }
    }

    return res.status(201).json({
      success: true,
      msg: "request palce",
      data: products
    });
  } catch (err) {
    console.log(err.message);
    if (err.number === 547) {
      if (err.procName === "SP_INSERT_PRODUCTS_IN_ORDER") {
        return errorResponse(
          400,
          "Bad request",
          [
            {
              msg:
                "Order placed with or without some produts, products.product values may be invalids",
              data: products
            }
          ],
          res
        );
      }
      return errorResponse(
        400,
        "Bad request",
        [{ msg: "requestType or deliveryType values may be invalids" }],
        res
      );
    }
    return errorResponse(
      500,
      "server error",
      [{ msg: "internal server error" }],
      res
    );
  }
};
