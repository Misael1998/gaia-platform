const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const paypal = require("paypal-rest-sdk");
const payments = paypal.v1.payments;
const mssql = require("mssql");

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

  if (!ft) {
    errorResponse(
      500,
      "server error",
      [{ msg: "role has been modified, cant proceed with payment" }],
      res
    );
  }

  try {
    let query = await new mssql.Request()
      .input("requestId", mssql.Int, req.body.request)
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

    products = query.recordset;
  } catch (err) {
    console.log(err.message);
    return errorResponse(
      500,
      "server error",
      [{ msg: "internal server error" }],
      res
    );
  }

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
      returnUrl = `${returnUrl}?origin=${req.get("origin")}`;
      cancelUrl = `${cancelUrl}?origin=${req.get("origin")}`;
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
        amount,
        description: "Hat for the best team ever"
      }
    ]
  };

  return res.send(createPaymentJson);

  let client = new paypal.core.PayPalHttpClient(env);

  let request = new payments.PaymentCreateRequest();
  request.requestBody(createPaymentJson);

  const payment = await client.execute(request);

  console.log(payment);
  // const { links } = payment.result;
  // for (let i = 0; i < links.length; i++) {
  //   if (links[i].rel === "approval_url") {
  //     res.set("Access-Control-Request-Headers", [
  //       "content-type",
  //       "x-xsrf-token"
  //     ]);
  //     res.set("Access-Control-Request-Method", "GET");
  //     return res.redirect(links[i].href);
  //   }
  // }

  res.send(payment);
};

exports.success = (req, res) => {
  res.send(req.query);
};
exports.cancel = (req, res) => {
  res.send("cancel route");
};
