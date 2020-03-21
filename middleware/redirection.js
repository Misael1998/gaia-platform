module.exports = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,HEAD,DELETE,OPTIONS,REDIRECT"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "content-Type,x-requested-with,x-auth-token"
  );

  next();
};
