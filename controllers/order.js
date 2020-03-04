const mssql = require('mssql');
const {
  validationResult
} = require("express-validator");
const errorResponse = require("../utils/errorResponse");



//@desc     insert order into DB
//@route    post     /api/data/products
//@access   Private
exports.providerOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validaton errors", errors.array(), res);
  }
  const {
    emissionDate,
    expireDate,
    idCreatedEmployee,
    idProvider,
    idSarType,
    idPaymentMethod,
    idSenderEmployee,
    idReceiverEmployee,
    idAddressEmployee,
    numBill,
    idSupply,
    quantity,
    unit
  } = req.body;


  try {

    query = await new mssql.Request()
      .input("emissionDate", mssql.Date, emissionDate)
      .input("expiredDate", mssql.Date, expireDate)
      .input("idCreatedEmployee", mssql.Int, idCreatedEmployee)
      .input("idProviders", mssql.Int, idProvider)
      .input("idSarType", mssql.Int, idSarType)
      .input("idPaymentMethods", mssql.Int, idPaymentMethod)
      .input("idSenderEmployee", mssql.Int, idSenderEmployee)
      .input("idReceiverEmployee", mssql.Int, idReceiverEmployee)
      .input("idAddressEmployee", mssql.Int, idAddressEmployee)
      .input("numBill", mssql.VarChar(100), numBill)
      .input("idSupplie", mssql.Int, idSupply)
      .input("quantity", mssql.VarChar(45), quantity)
      .input("unit", mssql.VarChar(45), unit)
      .output("pcMsj", mssql.VarChar(100))
      .output("CodeState", mssql.Int)
      .output("employeeName", mssql.VarChar(45))
      .output("providersName", mssql.VarChar(45))
      .output("sarDescription", mssql.VarChar(45))
      .output("paymentMethodName", mssql.VarChar(45))
      .output("supplyName", mssql.VarChar(45))
      .output("senderName", mssql.VarChar(45))
      .output("receiverName", mssql.VarChar(45))
      .output("addressName", mssql.VarChar(45))
      .output("idOrder",mssql.Int)
      .output("total",mssql.Float)
      .output("isv",mssql.Float)
      .output("value",mssql.Float)
      .execute("SP_ADD_ORDER");

    const { 
      CodeState,
      pcMsj,
      employeeName,
      providersName,
      sarDescription,
      paymentMethodName,
      supplyName,
      senderName,
      receiverName,
      addressName,
      idOrder,
      total,
      isv,
      value
    } = query.output;


    const data = {
      success:true,
      msg:pcMsj,
      idOrder,
      emissionDate,
      expireDate,
      total,
      value,
      isv,
      employeeName,
      providersName,
      sarDescription,
      paymentMethodName,
      supplyName,
      senderName,
      receiverName,
      addressName
    }


    switch (CodeState) {
      case 1:
        return res.status(201).json(data);
        break;
      case 2:
        return errorResponse(400,"Parameters errors",errors.array(),res)/*res.status(400).json({
          success: false,
          msg: pcMsj
        });*/
        break;
      default:
        return res.status(500).json({
          CodeState,
          pcMsj
        });
        break;
    }
  } catch (err) {
    console.log(err);
    return errorResponse(500,"Server Error",errors.array(),res)/*res.status(500).json({
      success: false,
      msg: "server error"
    });*/
  }
}