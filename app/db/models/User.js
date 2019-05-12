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
      enum: ['user', 'admin'],
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

UserSchema.methods.getFullData = function() {
  return omit(this, 'password')
}

UserSchema.methods.getPublicData = function() {
  return omit(this, ['password', 'status.mutedUntil', 'updatedAt'])
}

const User = model('user', UserSchema)

module.exports = User
