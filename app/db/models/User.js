const { Schema, model } = require('mongoose')
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
      enum: ['user', 'moder', 'admin'],
      default: 'user'
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

UserSchema.methods.getJWTPayload = function() {
  const plain = this.toObject()
  return {
    _id: plain._id
  }
}

UserSchema.methods.getFullData = function() {
  const plain = this.toObject()
  return omit(plain, 'password')
}

UserSchema.methods.getPublicData = function() {
  const plain = this.toObject()
  return omit(plain, ['password', 'status.mutedUntil', 'updatedAt'])
}

UserSchema.methods.hasModerAccess = function() {
  const plain = this.toObject()
  return ['moder', 'admin'].includes(plain.role)
}

UserSchema.methods.hasAdminAccess = function() {
  const plain = this.toObject()
  return ['admin'].includes(plain.role)
}

const User = model('user', UserSchema)

module.exports = User
