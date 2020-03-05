const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const {
  providerOrder
} = require('../controllers/order');

router.route("/provider/order").post([
  check("emissionDate","Emission Date missing").exists(),
  check("expireDate","Expire Date missing").exists(),
  check("idCreatedEmployee","Employee id missing").exists(),
  check("idProvider","Provider id missing").exists(),
  check("idSarType","SAR Type missing").exists(),
  check("idPaymentMethod","Payment method id missing").exists(),
  check("idSenderEmployee","Sender Employee id missing").exists(),
  check("idReceiverEmployee","Receiving employee id missing").exists(),
  check("idAddressEmployee","Address employee missing").exists(),
  check("numBill","Bill number missing").exists(),
  check("idSupply","Supply id missing").exists(),
  check("quantity","Quantity missing").exists(),
  check("unit","Unit missing").exists()
],
providerOrder);

module.exports = router;
