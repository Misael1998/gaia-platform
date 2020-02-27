const jwt = require('jsonwebtoken');



module.exports = function(req,res,next){
  //Get token from header
  const token = req.header('x-auth-token');

  //check if no jsonwebtoken
  if(!token){
    return res.status(401).json({
      msg: 'No token, authorization denied'
    })
  }

  //Verify token
  try {
    console.log(`token: ${token}`);
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.user = decoded.user;
    console.log(`decoded: ${decoded}`);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      msg: 'token is not valid'
    });
  }
}
