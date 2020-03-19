// Grant access to specific roles
const errorResponse = require("../utils/errorResponse");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        403,
        "Access denied",
        [
          {
            msg: `User with ${req.user.role} role is not authorize to access this resource`
          }
        ],
        res
      );
    }
    next();
  };
};
