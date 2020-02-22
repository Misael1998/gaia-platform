const errorResponse = (status, msg, errors, res) => {
  return res.status(status).json({
    success: false,
    msg,
    errors
  });
};

module.exports = errorResponse;
