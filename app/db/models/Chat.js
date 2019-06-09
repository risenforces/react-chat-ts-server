const { Schema, model } = require('mongoose')
const { accessModes, defaultAccessMode, matches: accessModeMatches } = require('@app/constants/chat-access-modes')
const { createDataMethod, is } = require('../helpers')

const ChatSchema = new Schema(
  {
    name: {
      type: String,
      required: true
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
    membersCount: {
      type: Number,
      default: 1
    },
    accessMode: {
      type: String,
      enum: accessModes,
      default: defaultAccessMode
    }
  },
  { timestamps: true }
)

ChatSchema.path('name').validate(async (name, next) => {
  if (!name) {
    return next()
  }

  try {
    const query = Chat.findOne({ name })
    const existingChat = await query.exec()

    if (!existingChat || !existingChat.name) {
      return next()
    }

    return next(false, 'Chat with this name already exists')
  } catch (err) {
    return next(false)
  }
})

ChatSchema.methods.isPublic = is('accessMode').oneOf(accessModeMatches.public)
ChatSchema.methods.isInviteOnly = is('accessMode').oneOf(accessModeMatches.inviteOnly)

ChatSchema.methods.getMembersCount = createDataMethod(data => data.membersCount)

const Chat = model('chat', ChatSchema)

module.exports = Chat
