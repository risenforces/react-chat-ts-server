const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const { validate } = require('@rest-v1-middlewares')
const schemas = require('./schemas')

const { User } = require('@app/db/models')

router.post('/', validate(schemas.signIn), async (req, res) => {
  const { username, password } = req.body

  try {
    const userQuery = User.findOne({ username })
    const user = await userQuery.exec()

    if (!user) {
      return res.send({
        status: 'failure',
        error: {
          code: '@sign-in/USER_NOT_FOUND',
          message: 'User not found'
        }
      })
    }

    const isCorrect = user.comparePassword(password)

    if (!isCorrect) {
      return res.send({
        status: 'failure',
        error: {
          code: '@sign-in/WRONG_PASSWORD',
          message: 'Wrong password'
        }
      })
    }

    const token = jwt.sign(user.getJWTPayload(), process.env.SECRET)

    return res.send({
      status: 'success',
      payload: {
        jwt: token
      }
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router
