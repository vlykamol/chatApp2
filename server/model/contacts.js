const mongoose = require('mongoose')
const user = require('./user')

const contactsTemplate = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  contacts:{
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }]
  }
})

module.exports = mongoose.model('contacts', contactsTemplate)