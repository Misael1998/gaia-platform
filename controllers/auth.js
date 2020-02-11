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
    // require sp that gets user role
    payload = {
      id: user.idUser,
      role: ""
    };

    return sendTokenResponse(user, payload, 200, res);

    // console.log(query);
    // console.log(user);
    //
    // res.status(200).json({
    //   success: true,
    //   msg: "auth route"
    // });
  } catch (err) {
    console.log(err);
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
          email: user.email,
          phone: user.phone,
          address: user.address
        }
      });
    }
  );
};
