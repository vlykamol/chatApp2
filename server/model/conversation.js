const mongoose = require('mongoose')
const user = require('../model/user')

const conversationTemplate = new mongoose.Schema({
  user:{
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  },
  message:{
    type: String,
    required: true
  },
  time:{
    type: Date,
    default: Date.now
  }
})

const conversation = mongoose.model("conversation", conversationTemplate)

const conversationsTemplate = new mongoose.Schema({
  roomName:{
    type: String,
    required: true
  },
  conversations:{
    type:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"conversation"
      }
    ]
  }
})

const conversations = mongoose.model('conversations', conversationsTemplate)

module.exports = {
  conversation,
  conversations
}