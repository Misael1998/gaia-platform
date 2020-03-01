const express = require('express');
const router = express.Router();

const {providerOrder} = require('../controllers/order');

router.route("/provider/order").post(providerOrder);

module.exports = router;
