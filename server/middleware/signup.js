const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
module.exports = {
  signup : (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    next();
  }
}