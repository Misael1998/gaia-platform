const jwt = require('jsonwebtoken');



module.exports = function(req,res,next){
  //Get token from header
  const token = req.header('x-auth-toke');

  //check if no jsonwebtoken
  if(!token){
    return res.status(401).json({
      msg: 'No token, authorization denied'
    })
  }

  //Verify jsonwebtoken
  try {
    const decoded = jwt.verify(token,process.env.JWT_KEY);

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({
      msg: 'token is not valid'
    });
  }
}
