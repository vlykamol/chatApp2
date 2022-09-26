const express = require('express')
const user = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const router = express.Router()

router.use((req, res) => {
  const email = req.body.email;
  user.findOne({email: email}).then(data => {
    const _user = {
      firstName : data.firstName,
      lastName : data.lastName,
      email : data.email
    }
    if(bcrypt.compare(req.body.password, data.password)){
      const access_token = jwt.sign(_user, process.env.ACCESS_TOKEN_SECRET)
      res.json({
        user:data.firstName,
        access_token : access_token
      })
    }
  }).catch(err => {
    console.log('user not found with this email',err);
  })
})


module.exports = router