//@desc     AUTH user
//@route    GET     /api/auth
//@access   Public
exports.authUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "endpoint to auth user"
  });
};
