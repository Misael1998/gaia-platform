const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const {sendBill} = require('../controllers/bill');
router.route('/').post(auth,sendBill);

module.exports = router;
