const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const paypal = require("paypal-rest-sdk");
const payments = paypal.v1.payments;
const mssql = require("mssql");

//@desc     make payment, generate bill
//@route    POST    /api/payment/pay
//@access   Private
exports.pay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validation errors", errors.array(), res);
  }

  let products = [];
  const { role, userId } = req.user;

  let ft;

  if (role === "individual") {
    ft = "FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL(@requestId, @user)";
  }

  if (role === "enterprise") {
    ft = "FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE(@requestId, @user)";
  }

  //checking if ft is assigned
  if (!ft) {
    errorResponse(
      500,
      "server error",
      [{ msg: "role has been modified, cant proceed with payment" }],
      res
    );
  }

  const userRequest = req.body.request;
  let query;

  //getting products in request
  try {
    query = await new mssql.Request()
      .input("requestId", mssql.Int, userRequest)
      .input("user", mssql.Int, userId)
      .query(`select * from ${ft}`);

    if (query.recordset.length === 0) {
      return errorResponse(
        404,
        "not found",
        [
          {
            msg:
              "cant find this request, or any products in it, cant proceed with payment"
          }
        ],
        res
      );
    }

    const control = query.recordset.reduce(
      (total, data) => (total += data.control),
      0
    );
    products = query.recordset;

    if (control === 1) {
      return errorResponse(
        400,
        "playment alredy placed",
        [{ msg: "go to payment link", url: products[0].description }],
        res
      );
    }

    if (control === 2) {
      return errorResponse(
        400,
        "cant proceed with payment",
        [{ msg: "request alredy payed" }],
        res
      );
    }
  } catch (err) {
    console.log(err.message);
    return errorResponse(
      500,
      "server error",
      [{ msg: "internal server error" }],
      res
    );
  }

  //setting url's for paypal rest api to redirect
  let returnUrl = `${req.protocol}://${req.get("host")}/api/payment/success`;
  let cancelUrl = `${req.protocol}://${req.get("host")}/api/payment/cancel`;

  let env;
  if (process.env.NODE_ENV === "production") {
    // Live Account details
    env = new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT,
      process.env.PAYPAL_CLIENT_SECRET
    );
  } else {
    if (process.env.NODE_ENV === "development") {
      // returnUrl = `${returnUrl}?origin=${req.get("origin")}`;
      // cancelUrl = `${cancelUrl}?origin=${req.get("origin")}`;
      returnUrl = `${returnUrl}?origin=localhost:3000/app/products`;
      cancelUrl = `${cancelUrl}?origin=localhost:3000`;
    }
    env = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT,
      process.env.PAYPAL_CLIENT_SECRET
    );
  }

  const items = products.map(product => {
    return {
      name: product.name,
      price: product.price,
      currency: "USD",
      quantity: product.quantity
    };
  });

  const amount = {
    currency: "USD",
    total: items.reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    )
  };

  //formating request to paypal standar
  const createPaymentJson = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: returnUrl,
      cancel_url: cancelUrl
    },
    transactions: [
      {
        item_list: {
          items
        },
        amount
      }
    ]
  };

  let client = new paypal.core.PayPalHttpClient(env);

  let request = new payments.PaymentCreateRequest();
  request.requestBody(createPaymentJson);

  try {
    //executing payment request to paypal rest api
    const payment = await client.execute(request);
    let tokenUrl;

    const { links } = payment.result;
    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === "approval_url") {
        tokenUrl = links[i].href;
      }
    }

    if (!tokenUrl) {
      return errorResponse(
        500,
        "server error",
        [{ msg: "something went wrong when trying to get paymet links" }],
        res
      );
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
      .input("requestId", mssql.Int, userRequest)
      .input("userId", mssql.Int, userId)
      .input("urlWithToken", mssql.VarChar(150), tokenUrl)
      .input("idPayment", mssql.VarChar(150), payment.result.id)
      .output("msg", mssql.VarChar(20))
      .output("err", mssql.VarChar(20))
      .execute(`${sp}`);

    if (query.output.msg !== "success") {
      return errorResponse(
        500,
        "server error",
        [{ msg: query.output.err }],
        res
      );
    }

    //responding with paypal generated url to proceed with payment
    res.status(201).json({
      success: true,
      url: tokenUrl
    });
  } catch (err) {
    console.log(err);

    return errorResponse(
      500,
      "server error",
      [{ msg: "internal server error" }],
      res
    );
  }
};

//@desc     redirect from paypal api on success payment
//@route    POST    /api/payment/success
//@access   Public
exports.success = async (req, res) => {
  try {
    const request = await new mssql.Request()
  .input('paymentId', mssql.VarChar(150), req.query.paymentId)
  .execute(SP_UPDATE_PAYMENT)

    if (process.env.NODE_ENV === 'development') {
      return res.redirect(`${req.query.origin}/app/products`)
    }

    return res.redirect(`${req.protocol}://${req.get("host")}/app/products`)
  } catch (err) {
    console.log(err);
    return errorResponse(500, 'server error'. [{msg: 'internal server error'}], res)
    
  }
};

//@desc     redirect from paypal api on canceled payment
//@route    POST    /api/payment/cancel
//@access   Public
exports.cancel = (req, res) => {
  res.send("cancel route");
};
