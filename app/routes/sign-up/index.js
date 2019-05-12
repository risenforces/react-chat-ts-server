const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const validate = require('@app/middlewares/validate')
const schemas = require('./schemas')
const routeSchemas = schemas['/']

const { User } = require('@app/db/models')

const { reservedUsernames } = require('@config')

router.post('/', validate(routeSchemas.post), async (req, res) => {
  const { username, password } = req.body

  try {
    if (reservedUsernames.includes(username)) {
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

    const token = jwt.sign(
      {
        ...user.toJSON(),
        password: undefined
      },
      process.env.SECRET
    )

    res.status(201)
    return res.send({
      status: 'success',
      payload: {
        token
      }
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router
