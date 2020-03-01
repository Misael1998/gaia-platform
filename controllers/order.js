const mssql = require('mssql');
// const {validationResult} = require("express-validator");
// const errorResponse = require("../utils/errorResponse");

exports.providerOrder = (req,res) =>{
  const {
    emission_date,
    provider,
    bill_num,
    supply_name,
    supply_measure,
    amount,
    unit_price,
    payment_method,
    expiration_date,
    requester_employee,
    reciever_employee,
    sender_employee,
    exempt_taxes
  } = req.body;


  const data = {
    emission_date,
    provider,
    bill_num,
    supply_name,
    supply_measure,
    amount,
    unit_price,
    payment_method,
    expiration_date,
    requester_employee,
    reciever_employee,
    sender_employee,
    exempt_taxes
  };



  res.json(data);
}
