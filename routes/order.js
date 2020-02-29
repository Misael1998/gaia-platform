const express = require('express');
const router = express.Router();

const {providerOrder} = require('../controllers/order');

router.route("/provider").post(providerOrder);

module.exports = router;
