const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const mssql = require("mssql");

//@desc     insert request with products into DB
//@route    post     /api/request
//@access   Private
exports.request = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validation errors", errors.array(), res);
  }
  const {
    emissionDate,
    shipping,
    requestType,
    deliveryType,
    payment
  } = req.body;

  let deliveryDescription = req.body.deliveryDescription;
  if (
    !deliveryDescription ||
    typeof deliveryDescription !== "string" ||
    deliveryDescription.length === 0
  ) {
    deliveryDescription = null;
  }

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
    const { userId, role } = req.user;

    const request = await new mssql.Request()
      .input("deliveryID", mssql.Int, deliveryType)
      .input("deliveryDescription", mssql.VarChar(150), deliveryDescription)
      .input("requestTypeID", mssql.Int, requestType)
      .input("date", mssql.DateTime, emissionDate)
      .input("shipping", mssql.Float, shipping)
      .input("payment", mssql.Int, payment)
      .input("clientID", mssql.Int, userId)
      .output("msj", mssql.VarChar(100))
      .output("err", mssql.VarChar(100))
      .output("id", mssql.Int)
      .execute("SP_INSERT_REQUEST");

    const requestId = request.output.id;
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

    let sp;
    if (role === "individual") {
      sp = "SP_CREATE_BILL_INDIVIDUAL";
    }

    if (role === "enterprise") {
      sp = "SP_CREATE_BILL_ENTERPRISE";
    }

    if (!sp) {
      errorResponse(
        500,
        "server error",
        [{ msg: "role has been modified, cant proceed with payment" }],
        res
      );
    }

    //creating a new bill in db with paypal payment parameters
    query = await new mssql.Request()
      .input("requestId", mssql.Int, requestId)
      .input("userId", mssql.Int, userId)
      .input("urlWithToken", mssql.VarChar(150), null)
      .input("idPayment", mssql.VarChar(150), null)
      .output("msg", mssql.VarChar(20))
      .output("err", mssql.VarChar(20))
      .execute(`${sp}`);

    return res.status(201).json({
      success: true,
      msg: "request placed",
      data: {
        requestId,
        products
      }
    });
  } catch (err) {
    console.log(err.message);
    if (err.number === 547) {
      if (err.procName === "SP_INSERT_PRODUCTS_IN_ORDER") {
        return errorResponse(
          202,
          "Request acepted",
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

//@desc     request details data
//@route    GET     /api/request/:id/details
//@access   Private, individual enterprise
exports.requestDetails = async (req, res, next) => {
  const { userId, role } = req.user;

  if (role === "individual") {
    try {
      const query = await new mssql.Request()
        .input("id", mssql.Int, userId)
        .input("idReq", mssql.Int, req.params.id)
        .query(
          "SELECT * FROM [dbo].[FT_GET_REQUEST_DETAIL_INDIVIDUAL](@id, @idReq)"
        );
      let data = query.recordset;
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "Not Found "
        });
      }
      let products = getProductsFromRequest(data);
      let tmpRequest = [
        ...new Set(
          data.map(x => {
            return JSON.stringify({
              idRequest: x.idRequest,
              emissionDate: x.emissionDate,
              deliveryType: x.deliveryType,
              deliveryDescription: x.deliveryDescription,
              paymentMethod: x.paymentMethod,
              subtotal: x.subtotal
            });
          })
        )
      ];
      tmpRequest = JSON.parse(tmpRequest);
      tmpRequest.products = products;
      data = tmpRequest;
      return res.status(200).json({
        success: true,
        msg: "Successful",
        data: data
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "server error"
      });
    }
  }

  if (role === "enterprise") {
    try {
      const query = await new mssql.Request()
        .input("id", mssql.Int, userId)
        .input("idReq", mssql.Int, req.params.id)
        .query(
          "SELECT * FROM [dbo].[FT_GET_REQUEST_DETAIL_ENTERPRISE](@id, @idReq)"
        );
      let data = query.recordset;
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "Not Found "
        });
      }
      let products = getProductsFromRequest(data);
      let tmpRequest = [
        ...new Set(
          data.map(x => {
            return JSON.stringify({
              idRequest: x.idRequest,
              emissionDate: x.emissionDate,
              deliveryType: x.deliveryType,
              deliveryDescription: x.deliveryDescription,
              paymentMethod: x.paymentMethod,
              subtotal: x.subtotal
            });
          })
        )
      ];
      tmpRequest = JSON.parse(tmpRequest);
      tmpRequest.products = products;
      data = tmpRequest;
      return res.status(200).json({
        success: true,
        msg: "Successful",
        data: data
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "server error"
      });
    }
  }

  if (role === "employee") {
    try {
      const query = await new mssql.Request()
        .input("idReq", mssql.Int, req.params.id)
        .query("SELECT * FROM [dbo].[FT_GET_REQUEST_DETAIL_EMPLOYEE](@idReq)");
      let data = query.recordset;
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "Not Found "
        });
      }
      let products = getProductsFromRequest(data);
      let tmpRequest = [
        ...new Set(
          data.map(x => {
            return JSON.stringify({
              idRequest: x.idRequest,
              idClient: x.idClient,
              client: x.client,
              emissionDate: x.emissionDate,
              deliveryType: x.deliveryType,
              deliveryDescription: x.deliveryDescription,
              paymentMethod: x.paymentMethod,
              subtotal: x.subtotal
            });
          })
        )
      ];
      tmpRequest = JSON.parse(tmpRequest);
      tmpRequest.products = products;
      data = tmpRequest;
      return res.status(200).json({
        success: true,
        msg: "Successful",
        data: data
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "server error"
      });
    }
  }
};

const getProductsFromRequest = data => {
  return data.map(product => {
    return {
      idProduct: product.idProduct,
      product: product.products,
      quantity: product.quantity
    };
  });
};

//@desc     request data
//@route    GET     /api/request/requests-data
//@access   Private, employee

exports.requestData = async (req, res, next) => {
  const { userId, role } = req.user;

  if (role === "employee") {
    try {
      const query = await new mssql.Request().query(
        "SELECT * FROM [dbo].[FT_GET_REQUEST_DATA]()"
      );
      const data = query.recordset;
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "Not Found "
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Successful",
        data: data
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "server error"
      });
    }
  }
};

exports.getRequestQT = async (req, res) => {
  try {
    const request = await new mssql.Request().query(
      "select dbo.FS_GET_REQUEST_QT() quantity"
    );
    res.status(200).json({
      success: true,
      data: request.recordset[0]
    });
  } catch (err) {
    console.log(err);
    return errorResponse(
      500,
      "server error",
      [{ err: "internal server error" }],
      res
    );
  }
};
