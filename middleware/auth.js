const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return errorResponse(
      401,
      "Access denied",
      [{ msg: "no token, access denied" }],
      res
    );
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = {
      userId: decoded.id,
      role: decoded.role
    };

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(401, "Access denied", [{ msg: "invalid token" }], res);
  }
};
