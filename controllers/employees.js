const { validationResult } = require("express-validator");
const mssql = require("mssql");
const bcrypt = require("bcryptjs");
const errorResponse = require("../utils/errorResponse");

//@desc     Create new employee
//@route    post     /api/employess
//@access   Private, admin
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validation errors", errors.array(), res);
  }
  const {
    empName,
    empLast,
    address,
    phone,
    email,
    jobTitle,
    department,
    admissionDate,
    password
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const request = await new mssql.Request()
      .input("name", mssql.VarChar(45), empName)
      .input("lastName", mssql.VarChar(45), empLast)
      .input("address", mssql.VarChar(150), address)
      .input("phone", mssql.VarChar(12), phone)
      .input("email", mssql.VarChar(100), email)
      .input("password", mssql.VarChar(100), hashPwd)
      .input("jobTitle", mssql.Int, jobTitle)
      .input("department", mssql.Int, department)
      .input("admissionDate", mssql.Date, admissionDate)
      .input("admin", mssql.Int, req.user.userId)
      .output("msj", mssql.VarChar(50))
      .output("err", mssql.VarChar(50))
      .execute("SP_CREATE_EMPLOYEE");

    if (request.output.msj !== "success") {
      return errorResponse(
        400,
        "bad request",
        [{ msg: request.output.err }],
        res
      );
    }

    return res.status(201).json({
      success: true,
      msg: "new employee registered"
    });
  } catch (err) {
    console.log(err);
    if (err.number === 515) {
      return errorResponse(
        400,
        "bad request",
        [{ msg: "cant register email" }],
        res
      );
    }
    return errorResponse(
      500,
      "server error",
      [{ msg: "internal server error" }],
      res
    );
  }
};
