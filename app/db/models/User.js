const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const omit = require('deep-omit')

const { roles, defaultRole, matches: rolesMatches } = require('@app/constants/general-roles')

const { createDataMethod, is } = require('../helpers')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
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
      }
    }
  },
  { timestamps: true }
)

UserSchema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const hash = bcrypt.hashSync(user.password, 12)

  user.password = hash
  next()
})

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.getJWTPayload = createDataMethod(data => ({
  _id: data._id
}))

UserSchema.methods.getFullData = createDataMethod(data => {
  return omit(data, 'password')
})

UserSchema.methods.getPublicData = createDataMethod(data => {
  return omit(data, ['password', 'updatedAt'])
})

UserSchema.methods.hasUserAccess = is('role').oneOf(rolesMatches.user)
UserSchema.methods.hasModerAccess = is('role').oneOf(rolesMatches.moder)
UserSchema.methods.hasAdminAccess = is('role').oneOf(rolesMatches.admin)
UserSchema.methods.hasCreatorAccess = is('role').oneOf(rolesMatches.creator)

UserSchema.methods.matchesRole = function(role) {
  const data = this.toObject()
  return rolesMatches[role].includes(data.role)
}

UserSchema.methods.isBanned = is('status.banned').equalTo(true)

const User = model('user', UserSchema)

module.exports = User
