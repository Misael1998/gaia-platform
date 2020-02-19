const mssql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

  console.log(req.body);

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
      msg: "Bad request, make sure to send every field"
    });
  }

  console.log(birthDate);

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
      .input("birth_date", mssql.VarChar(45), birthDate)
      .input("register_id", mssql.NVarChar(14), id)
      .output("pcMsj", mssql.NVarChar(100))
      .output("id_user", mssql.Int)
      .output("CodeState", mssql.Int)
      .execute("SP_ADD_USER_INDIVIDUAL");

    console.log(query);
    const { id_user, msjTemp } = query.output;
    if (!id_user) {
      return res.status(400).json({
        success: false,
        msg: "Can't add user"
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
