const {
  Schema,
  Types: { ObjectId },
  model
} = require('mongoose')

const { roles, defaultRole, matches: rolesMatches } = require('@app/constants/chat-roles')

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
      enum: roles,
      default: defaultRole
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

ChatMemberSchema.methods.hasMemberAccess = is('role').oneOf(rolesMatches.member)
ChatMemberSchema.methods.hasModerAccess = is('role').oneOf(rolesMatches.moder)
ChatMemberSchema.methods.hasAdminAccess = is('role').oneOf(rolesMatches.admin)
ChatMemberSchema.methods.hasOwnerAccess = is('role').oneOf(rolesMatches.owner)

ChatMemberSchema.methods.matchesRole = function(role) {
  const data = this.toObject()
  return rolesMatches[role].includes(data.role)
}

ChatMemberSchema.methods.isBanned = is('status.banned').equalTo(true)
ChatMemberSchema.methods.isMuted = is('status.mutedUntil').notEqualTo(null)

const ChatMember = model('chat-member', ChatMemberSchema)

module.exports = ChatMember
