const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const validate = require('@app/middlewares/validate')
const schemas = require('./schemas')
const routeSchemas = schemas['/']

const { User } = require('@app/db/models')

router.post('/', validate(routeSchemas.post), async (req, res) => {
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

    const token = jwt.sign(
      {
        ...user.toJSON(),
        password: undefined
      },
      process.env.SECRET
    )

    return res.send({
      status: 'success',
      payload: {
        token
      }
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
