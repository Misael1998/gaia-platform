const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mssql = require("mssql");
const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");

//@desc     Register enterpise clients
//@route    POST     /api/user/enterpriseclient
//@access   Public
exports.registerEnterpriseUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validaton errors", errors.array(), res);
  }

  const {
    email,
    password,
    phone,
    address,
    company_name,
    company_type,
    rtn,
    contact_name,
    contact_number,
    sector,
    business_name
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    query = await new mssql.Request()
      .input("email", mssql.VarChar(100), email)
      .input("password", mssql.VarChar(100), encryptedPassword)
      .input("phone", mssql.VarChar(12), phone)
      .input("address", mssql.VarChar(150), address)
      .input("company_name", mssql.VarChar(45), company_name)
      .input("contact_name", mssql.VarChar(45), contact_name)
      .input("rtn", mssql.VarChar(12), rtn)
      .input("contact_number", mssql.VarChar(12), contact_number)
      .input("idCompanyType", mssql.Int, company_type)
      .input("idSector", mssql.Int, sector)
      .input("business_name", mssql.NVarChar(45), business_name)
      .output("pcMsj", mssql.VarChar(45))
      .output("id_user", mssql.Int)
      .output("CodeState", mssql.Int)
      .execute("SP_ADD_USER_ENTERPRISE");

    const { CodeState, id_user, pcMsj } = query.output;

    switch (CodeState) {
      case 0:
        return res.status(500).json({
          success: false,
          msg: pcMsj
        });
        break;
      case 1:
        payload = {
          id: id_user,
          role: "enterpise"
        };

        const user = {
          email,
          company_name,
          company_type,
          business_name
        };
        return sendTokenResponse(user, payload, 201, res);
        break;
      case 2:
        return res.status(400).json({
          success: false,
          msg: pcMsj
        });
        break;
      case 3:
        return res.status(400).json({
          success: false,
          msg: pcMsj
        });
        break;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "server error"
    });
  }
};

//@desc     Register individual user
//@route    POST     /api/user/registerindivualclient
//@access   Public
exports.registerIndividualClient = async (req, res, next) => {
  const {
    email,
    password,
    phone,
    address,
    name,
    lastName,
    register_id,
    birth_date
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validaton errors", errors.array(), res);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const query = await new mssql.Request()
      .input("email", mssql.NVarChar(100), email)
      .input("password", mssql.NVarChar(100), hashPassword)
      .input("phone", mssql.NVarChar(12), phone)
      .input("address", mssql.NVarChar(150), address)
      .input("name", mssql.NVarChar(45), name)
      .input("lastName", mssql.NVarChar(45), lastName)
      .input("birth_date", mssql.VarChar(45), birth_date)
      .input("register_id", mssql.NVarChar(14), register_id)
      .output("pcMsj", mssql.NVarChar(100))
      .output("id_user", mssql.Int)
      .output("CodeState", mssql.Int)
      .execute("SP_ADD_USER_INDIVIDUAL");

    const { id_user, pcMsj } = query.output;
    if (!id_user) {
      return res.status(400).json({
        success: false,
        msg: pcMsj
      });
    }

    const user = {
      name: name,
      lastname: lastName,
      role: "individual",
      email,
      phone,
      address
    };

    payload = {
      id: id_user,
      role: "individual"
    };

    return sendTokenResponse(user, payload, 201, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "server error"
    });
  }

  res.status(200).json({
    success: true,
    msg: "register client route"
  });
};

//send response
const sendTokenResponse = (user, payload, statusCode, res) => {
  jwt.sign(
    payload,
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRE },
    (err, token) => {
      if (err) throw err;

      return res.status(200).json({
        success: true,
        token: token,
        user
      });
    }
  );
};
