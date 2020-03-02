const jwt = require('jsonwebtoken');



module.exports = (req,res,next) =>{
  const token = req.header('x-auth-token');

  if(!token){
    return res.status(401).json({
      success: false,
      msg: 'No token, authorization denied'
    })
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      msg: 'token is not valid'
    });
  }
}
