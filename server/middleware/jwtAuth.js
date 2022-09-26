const jwt = require('jsonwebtoken')
module.exports = {
  jwtAuth : (req, res, next) => {
    console.log('jwt authentication..');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.json({err : "user not authenticated"})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) return res.json({err: "user don't have access"})
      console.log(user);
    })
    next()
  }
}