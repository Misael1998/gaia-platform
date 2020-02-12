const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mssql = require("mssql");

//@desc     AUTH user
//@route    GET     /api/auth/login
//@access   Public
exports.login = async (req, res, next) => {
  let payload = {};
  const { email, password } = req.body;
  const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env;

  try {
    let query = await new mssql.Request()
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

    const user = query.recordset[0];

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
