const mongoose = require('mongoose')
const user = require('./user')

const roomTamplate = new mongoose.Schema({
  roomName:{
    type: String,
    required : true
  },
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  members:[{
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  }]
})

module.exports = mongoose.model('room', roomTamplate)