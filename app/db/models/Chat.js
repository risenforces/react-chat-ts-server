const { Schema, model } = require('mongoose')
const { is } = require('../helpers')

const ChatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    accessMode: {
      type: String,
      enum: ['public', 'invite-only'],
      default: 'public'
    }
  },
  { timestamps: true }
)

ChatSchema.methods.isPublic = is('accessMode').equalTo('public')
ChatSchema.methods.isInviteOnly = is('accessMode').equalTo('invite-only')

const Chat = model('chat', ChatSchema)

module.exports = Chat
