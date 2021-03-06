const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const { validate } = require('@rest-v1/middlewares')
const schemas = require('./schemas')

const { User } = require('@app/db/models')

const reservedNames = require('@app/constants/reserved-names')

router.post('/', validate(schemas.signUp), async (req, res) => {
  const { username, password } = req.body

  try {
    if (reservedNames.includes(username)) {
      return res.send({
        status: 'failure',
        error: {
          code: '@sign-up/USERNAME_IS_RESERVED',
          message: `Username "${username}" is reserved and cannot be used`
        }
      })
    }

    const existingUserQuery = User.findOne({ username })
    const existingUser = await existingUserQuery.exec()

    if (existingUser) {
      return res.send({
        status: 'failure',
        error: {
          code: '@sign-up/USER_ALREADY_EXISTS',
          message: 'User already exists'
        }
      })
    }

    const createQuery = User.create({
      username,
      password
    })
    const user = await createQuery

    const token = jwt.sign(user.getJWTPayload(), process.env.SECRET)

    res.status(201)
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
