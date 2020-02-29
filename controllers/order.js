const mssql = require('mssql');
// const {validationResult} = require("express-validator");
// const errorResponse = require("../utils/errorResponse");


exports.providerOrder = (req,res)=>{
  // const errors = validationResult(req);
  // if(!erros.isEmpy()){
  //   return errorResponse(400,"Validation error", errors.array(),res);
  // }
const {
  emission_date,
  provider,
  bill_num,
  supply_name,
  supply_measure,
  amount,
  unit_price,
  payment_type,
  expiration_date,
  requester_employee,
  reciever_employee,
  sender_employee,
  exempt_taxes
} = req.boody;






  res.send("funciona");
}
