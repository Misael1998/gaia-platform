const express = require ('express');
const router = express.Router();
const { check } = require("express-validator");
const {PRObill} = require('../controllers/probill');



router.route("/").post([
    check("idRequest","Submit Id Request").exists(),
    check("num_bill", "Submit Number Bill").exists(),
    check("emission_date","Submit emission Date").exists(),
    check("description", "Submit Description").exists(),
    check("maquila", "Submit Maquila").exists(),
    check("netPlan", "Submit Exent").exists(),

], PRObill);




module.exports = router;
