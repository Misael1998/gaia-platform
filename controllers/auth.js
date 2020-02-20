const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mssql = require("mssql");
const crypto = require("crypto");
const moment = require("moment");
const sendEmail = require("../utils/sendEmail.js");

//@desc     AUTH user
//@route    GET     /api/auth/login
//@access   Public
exports.login = async (req, res, next) => {
  let payload = {};
  const { email, password } = req.body;
  const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env;

  try {
    const user = await getUser(email, res);

    const isAdmin =
      user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD;

    if (isAdmin) {
      payload = {
        id: user.idUser,
        role: "admin"
      };

      return sendTokenResponse(user, payload, 200, res);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    query = await new mssql.Request()
      .input("userId", mssql.VarChar(100), user.idUser)
      .query("select pyflor.dbo.getUserRole(@userId) role");

    const { role } = query.recordset[0];

    user.role = role;

    // require sp that gets user role
    payload = {
      id: user.idUser,
      role: role
    };

    return sendTokenResponse(user, payload, 200, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "server error"
    });
  }
};

//@desc     Getting a token to reset password
//@route    POST     /api/auth/forgotpassword
//@access   Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await getUser(email, res);

    let token = crypto.randomBytes(20).toString("hex");
    token = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    let expireDate = moment(Date.now() + 10 * 60 * 1000);

    expireDate = expireDate.format("YYYY-MM-DD hh:mm:ss");

    const query = await new mssql.Request()
      .input("token", mssql.VarChar(mssql.MAX), token)
      .input("expireDate", mssql.DateTime, expireDate)
      .input("idUser", mssql.Int, user.idUser)
      .output("status", mssql.VarChar(7))
      .execute("SP_SET_FORGOT_PASSWORD_TOKEN");

    if (query.output.status != "success") {
      return res.status(500).json({
        success: false,
        msg: "server error"
      });
    }

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please copy this token into the recovery password form: \n\n ${token}`;

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "sprint"
    ) {
      await sendEmail({
        email: process.env.TEST_EMAIL,
        subject: "Password reset token",
        message
      });

      return res.status(201).json({
        success: true,
        msg: "token created"
      });
    } else {
      await sendEmail({
        email: email,
        subject: "Password reset token",
        message
      });

      return res.status(201).json({
        success: true,
        msg: "token created"
      });
    }

    res.status(201).json({
      success: true,
      msg: "token created"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "server error"
    });
  }
};

//@desc     Reseting password by sending recuperation token
//@route    PUT     /api/auth/resetpassword/:token
//@access   Public
exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const query = await new mssql.Request()
      .input("token", mssql.VarChar(mssql.MAX), token)
      .input("newPassword", mssql.VarChar(mssql.MAX), newPassword)
      .output("status", mssql.VarChar(7))
      .execute("SP_RESET_FORGOT_PASSWORD");

    if (query.output.status != "success") {
      return res.status(400).json({
        success: false,
        msg: "Invalid token"
      });
    }

    res.status(201).json({
      success: true,
      msg: "password reseted"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "server error"
    });
  }
};

//get user
const getUser = async (email, res) => {
  const query = await new mssql.Request()
    .input("email", mssql.VarChar(100), email)
    .query("select * from TBL_USERS where email = @email");

  const { recordset } = query;
  const dataExist = recordset.length > 0;

  if (!dataExist) {
    return res.status(404).json({
      success: false,
      msg: "Invalid credentials"
    });
  }

  return recordset[0];
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
        user: {
          firstName: user.name,
          lastName: user.lastname,
          role: user.role,
          email: user.email,
          phone: user.phone,
          address: user.address
        }
      });
    }
  );
};
