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
      .input("business_name", mssql.VarChar(45), business_name)
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
          role: "enterprise"
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
      .input("email", mssql.VarChar(100), email)
      .input("password", mssql.VarChar(100), hashPassword)
      .input("phone", mssql.VarChar(12), phone)
      .input("address", mssql.VarChar(150), address)
      .input("name", mssql.VarChar(45), name)
      .input("lastName", mssql.VarChar(45), lastName)
      .input("birth_date", mssql.VarChar(45), birth_date)
      .input("register_id", mssql.VarChar(14), register_id)
      .output("pcMsj", mssql.VarChar(100))
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

//@desc     update basic info of users
//@route    POST     /api/user/updateuser
//@access   Private
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validaton errors", errors.array(), res);
  }

  const { email, address, phone, cNumber, cName } = req.body;
  const empty = !email && !phone && !address && !cName && !cNumber;
  if (empty) {
    return errorResponse(
      400,
      "No parameters",
      [{ msg: "The request has no paramters" }],
      res
    );
  }

  const { userId, role } = req.user;
  if (role == "individual") {
    try {
      const query = await new mssql.Request()
        .input("id", mssql.Int, userId)
        .input("email", mssql.VarChar(100), email)
        .input("phone", mssql.VarChar(100), phone)
        .input("address", mssql.VarChar(100), address)
        .output("code", mssql.Int)
        .execute("SP_UPDATE_INDIVIDUAL_USER");
      const { code } = query.output;
      switch (code) {
        case 0:
          return errorResponse(
            404,
            "No user found.",
            [{ msg: "There is no user registered with this id." }],
            res
          );
          break;
        case 1:
          return errorResponse(
            403,
            "Access denied.",
            [{ msg: "This user is not individual." }],
            res
          );
          break;
        case 2:
          return errorResponse(
            400,
            "Nothing to update.",
            [{ msg: "No changes were made due to empty fields." }],
            res
          );
          break;
        case 3:
          return res.status(200).json({
            success: true,
            msg: "Fields have been updated."
          });
          break;
        case 4:
          return errorResponse(
            400,
            "Email occupied",
            [{ msg: "There is an existing user with this email." }],
            res
          );
          break;
      }
    } catch (error) {
      console.log(error);
      return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
    }
  }
  try {
    const query = await new mssql.Request()
      .input("id", mssql.Int, userId)
      .input("email", mssql.VarChar(100), email)
      .input("phone", mssql.VarChar(100), phone)
      .input("address", mssql.VarChar(100), address)
      .input("contact_number", mssql.VarChar(12), cNumber)
      .input("contact_name", mssql.VarChar(45), cName)
      .output("code", mssql.Int)
      .execute("SP_UPDATE_ENTERPRISE_USER");
    const { code } = query.output;
    switch (code) {
      case 0:
        return errorResponse(
          404,
          "No user found",
          [{ msg: "There is no user registered with this id" }],
          res
        );
        break;
      case 1:
        return errorResponse(
          403,
          "Access denied",
          [{ msg: "This user is not enterprise." }],
          res
        );
        break;
      case 2:
        return errorResponse(
          400,
          "Nothing to update",
          [{ msg: "No changes were made due to empty fields" }],
          res
        );
        break;
      case 3:
        return res.status(200).json({
          success: true,
          msg: "Fields have been updated"
        });
        break;
      case 4:
        return errorResponse(
          400,
          "Email occupied",
          [{ msg: "There is an existing user with this email." }],
          res
        );
        break;
    }
  } catch (error) {
    console.log(error);
    return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
  }
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
