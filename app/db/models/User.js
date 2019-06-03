const { Schema, model } = require('mongoose')
const { createDataMethod, is } = require('../helpers')
const bcrypt = require('bcrypt')
const omit = require('deep-omit')

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
      enum: ['user', 'moder', 'admin', 'creator'],
      default: 'user'
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

UserSchema.methods.hasModerAccess = is('role').oneOf(['moder', 'admin', 'creator'])
UserSchema.methods.hasAdminAccess = is('role').oneOf(['admin', 'creator'])
UserSchema.methods.hasCreatorAccess = is('role').equalTo('creator')

const User = model('user', UserSchema)

module.exports = User
