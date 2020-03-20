const paypal = require("paypal-rest-sdk");

exports.pay = (req, res) => {
  const returnUrl = `${req.protocol}://${req.get("host")}/api/payment/success`;
  const cancelUrl = `${req.protocol}://${req.get("host")}/api/payment/cancel`;

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

  paypal.payment.create(createPaymentJson, (err, payment) => {
    if (err) {
      throw err;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          console.log(payment.links[i].href);
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

exports.success = (req, res) => {
  res.send(req.query);
};
exports.cancel = (req, res) => {
  res.send("cancel route");
};
