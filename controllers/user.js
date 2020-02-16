const mssql = require("mssql");
const jwt = require("jsonwebtoken");

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
    id,
    birthDate
  } = req.body;

  let isValid = false;

  if (
    !(
      email.trim() &&
      password.trim() &&
      phone.trim() &&
      address.trim() &&
      name.trim() &&
      lastName.trim() &&
      id.trim() &&
      birthDate.trim()
    )
  ) {
    return res.status(400).json({
      success: false,
      msg: "Bad request"
    });
  }

  try {
    const query = await new mssql.Request()
      .input("email", mssql.VarChar(100), email)
      .input("password", mssql.VarChar(100), password)
      .input("phone", mssql.VarChar(12), phone)
      .input("address", mssql.VarChar(150), address)
      .input("name", mssql.VarChar(45), name)
      .input("lastName", mssql.VarChar(45), lastName)
      .input("id", mssql.VarChar(13), id)
      .input("birthDate", mssql.Date, birthDate)
      .output("status", mssql.VarChar(mssql.MAX))
      .output("idUser", mssql.Int)
      .execute("SP_REGISTER");

    const { status, idUser } = query.output;

    if ((status = 1)) {
      console.log(1);
    }
  } catch (err) {
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
