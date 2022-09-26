const express = require('express')
const user = require('../model/user')
const userTemplate = require('../model/user')

const router = express.Router()

router.use((req, res) => {
  const user = new userTemplate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password : req.body.password
  })
  
  user.save().then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(500).json(err)
  })
})


module.exports = router