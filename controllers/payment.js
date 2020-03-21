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

  const returnUrl = `${req.protocol}://${req.get("host")}/api/payment/success`;
  const cancelUrl = `${req.protocol}://${req.get("host")}/api/payment/cancel`;

  let env;
  if (process.env.NODE_ENV === "production") {
    // Live Account details
    env = new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT,
      process.env.PAYPAL_CLIENT_SECRET
    );
  } else {
    env = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT,
      process.env.PAYPAL_CLIENT_SECRET
    );
  }

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
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: "25.00"
        },
        description: "Hat for the best team ever"
      }
    ]
  };

  let client = new paypal.core.PayPalHttpClient(env);

  let request = new payments.PaymentCreateRequest();
  request.requestBody(createPaymentJson);
  // paypal.payment.create(createPaymentJson, (err, payment) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     for (let i = 0; i < payment.links.length; i++) {
  //       if (payment.links[i].rel === "approval_url") {
  //         console.log(payment.links[i].href);
  //         console.log(res);
  //         console.log(req.query);
  //         console.log(payment);
  //         res.setHeader("X-Requested-With", "XMLHttpRequest");
  //         res.redirect(payment.links[i].href);
  //       }
  //     }
  //   }
  // });

  const payment = await client.execute(request);

  console.log(payment);
  // for (let i = 0; i < payment.result.links.length; i++) {
  //   if (payment.links[i].rel === "approval_url") {
  //     res.redirect(payment.result.links[i].href);
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
