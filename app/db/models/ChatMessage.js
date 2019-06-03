const {
  Schema,
  Types: { ObjectId },
  model
} = require('mongoose')

const { is } = require('../helpers')

const AttachmentSchema = new Schema({
  type: {
    type: String,
    enum: ['photo', 'reply', 'forward']
  },
  url: {
    type: String,
    default: undefined
  },
  messages: {
    type: [ObjectId],
    default: undefined
  }
})

const ChatMessageSchema = new Schema(
  {
    chatId: {
      type: ObjectId,
      required: true
    },
    sender: {
      type: {
        type: String,
        enum: ['user', 'system'],
        default: 'system'
      },
      id: {
        type: ObjectId,
        default: null
      }
    },
    text: {
      type: String,
      required: true
    },
    attachments: {
      type: [AttachmentSchema],
      default: []
    }
  },
  { timestamps: true }
)

ChatMemberSchema.methods.hasModerAccess = is('role').oneOf(['moder', 'admin', 'owner'])
ChatMemberSchema.methods.hasAdminAccess = is('role').oneOf(['admin', 'owner'])
ChatMemberSchema.methods.hasOwnerAccess = is('role').equalTo('owner')

ChatMemberSchema.methods.isBanned = is('status.banned').equalTo(true)
ChatMemberSchema.methods.isMuted = is('status.mutedUntil').notEqualTo(null)

const ChatMember = model('chat-member', ChatMemberSchema)

module.exports = ChatMember
