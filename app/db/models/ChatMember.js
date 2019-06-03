const {
  Schema,
  Types: { ObjectId },
  model
} = require('mongoose')
const { is } = require('../helpers')

const ChatMemberSchema = new Schema(
  {
    chatId: {
      type: ObjectId,
      required: true
    },
    userId: {
      type: ObjectId,
      required: true
    },
    role: {
      type: String,
      enum: ['member', 'moder', 'admin', 'owner']
    },
    status: {
      banned: {
        type: Boolean,
        default: false
      },
      mutedUntil: {
        type: Date,
        default: null
      }
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
