module.exports = {
  login : (req, res, next) => {

    console.log('log from login middleware');
    next()
  }
}