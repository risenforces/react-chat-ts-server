const { Router } = require('express')
const router = Router()

const validate = require('@app/middlewares/validate')
const schemas = require('./schemas')
const roles = require('@app/middlewares/roles')

const { User } = require('@app/db/models')

const reservedUsernames = require('@app/constants/reserved-usernames')

router.get('/:username', validate(schemas.getUser), async (req, res) => {
  const { user: currentUser } = req
  const { username } = req.params

  try {
    // the user asks for his data
    // return full data
    if (username === 'me') {
      return res.send({
        status: 'success',
        payload: {
          user: currentUser.getFullData()
        }
      })
    }

    const userQuery = User.findOne({ username })
    const user = await userQuery.exec()

    // the requested user is not exist in DB
    // return failure
    if (!user) {
      return res.send({
        status: 'failure',
        error: {
          code: '@users/USER_NOT_FOUND',
          message: 'User not found'
        }
      })
    }

    // the user with moderator access asks for another user's data
    // return full data
    if (currentUser.hasModerAccess()) {
      return res.send({
        status: 'success',
        payload: {
          user: user.getFullData()
        }
      })
    }

    // the user without any special access asks for another user's data
    // return only public data in this case
    return res.send({
      status: 'success',
      payload: {
        user: user.getPublicData()
      }
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

router.post(
  '/',
  roles.admin,
  validate(schemas.createUser),
  async (req, res) => {
    const { data, ignoreReserved } = req.body
    const { username } = data

    try {
      if (!ignoreReserved && reservedUsernames.includes(username)) {
        return res.send({
          status: 'failure',
          error: {
            code: '@users/USERNAME_IS_RESERVED',
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
            code: '@users/USER_ALREADY_EXISTS',
            message: 'User already exists'
          }
        })
      }

      const createQuery = User.create(data)
      const user = await createQuery

      res.status(201)
      return res.send({
        status: 'success',
        payload: {
          user: user.getFullData()
        }
      })
    } catch (err) {
      res.sendStatus(500)
    }
  }
)

router.post(
  '/:username/edit',
  roles.admin,
  validate(schemas.editUser),
  async (req, res) => {
    const { username } = req.params
    const { data, ignoreReserved } = req.body

    try {
      if (data.username && data.username !== username) {
        if (!ignoreReserved && reservedUsernames.includes(data.username)) {
          return res.send({
            status: 'failure',
            error: {
              code: '@users/USERNAME_IS_RESERVED',
              message: `Username "${username}" is reserved and cannot be used`
            }
          })
        }
      }

      const updateQuery = User.findOneAndUpdate({ username }, data)
      const updatedUser = updateQuery.exec()

      if (!updatedUser) {
        return res.send({
          status: 'failure',
          error: {
            code: '@users/USER_NOT_FOUND',
            message: 'User not found'
          }
        })
      }

      return res.send({
        status: 'success',
        payload: {
          user: updatedUser
        }
      })
    } catch (err) {
      res.sendStatus(500)
    }
  }
)

router.post('/me/edit', validate(schemas.editMe), async (req, res) => {
  const { username } = req.user.toObject()
  const { data } = req.body

  try {
    if (data.username && data.username !== username) {
      if (reservedUsernames.includes(data.username)) {
        return res.send({
          status: 'failure',
          error: {
            code: '@users/USERNAME_IS_RESERVED',
            message: `Username "${username}" is reserved and cannot be used`
          }
        })
      }
    }

    const updateQuery = User.findOneAndUpdate({ username }, data)
    const updatedUser = updateQuery.exec()

    if (!updatedUser) {
      return res.send({
        status: 'failure',
        error: {
          code: '@users/USER_NOT_FOUND',
          message: 'User not found'
        }
      })
    }

    return res.send({
      status: 'success',
      payload: {
        user: updatedUser
      }
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router
