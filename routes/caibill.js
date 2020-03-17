const express = require ('express');
const router = express.Router();
const { check } = require("express-validator");
const {CAIbill} = require('../controllers/caibill');



router.route("/").post([
    check("idRequest","Submit Id Request").exists(),
    check("num_bill", "Submit Number Bill").exists(),
    check("emission_date","Submit emission Date").exists(),
    check("idtaxes", "Submit Taxes").exists(),
    check("imports", "Submit Import").exists(),
    check("exent", "Submit Exent").exists(),
    check("total","Submit Total").exists(),
    check("subtotal","Submit subtotal").exists(),

], CAIbill);




module.exports = router;
