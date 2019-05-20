const { User } = require('@app/db/models')

const validate = require('@app/middlewares/validate')
const schemas = require('../schemas')
const roles = require('@app/middlewares/roles')

const reservedUsernames = require('@app/constants/reserved-usernames')

exports.setupEdit = router => {
  router.put('/me', validate(schemas.editMe), async (req, res) => {
    const { user: currentUser } = req
    const { username: currentUsername } = currentUser.getFullData()
    const { data } = req.body

    try {
      if (data.username && data.username !== currentUsername) {
        if (reservedUsernames.includes(data.username)) {
          return res.send({
            status: 'failure',
            error: {
              code: '@users/USERNAME_IS_RESERVED',
              message: `Username "${
                data.username
              }" is reserved and cannot be used`
            }
          })
        }

        const existingUserQuery = User.findOne({ username: data.username })
        const existingUser = await existingUserQuery.exec()

        if (existingUser) {
          return res.send({
            status: 'failure',
            error: {
              code: '@users/USER_ALREADY_EXISTS',
              message: 'This username is already taken'
            }
          })
        }
      }

      const updateQuery = User.findOneAndUpdate(
        { username: currentUsername },
        data,
        { new: true }
      )
      const updatedUser = await updateQuery.exec()

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
          user: updatedUser.getFullData()
        }
      })
    } catch (err) {
      res.sendStatus(500)
    }
  })

  router.put(
    '/:username',
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
                message: `Username "${
                  data.username
                }" is reserved and cannot be used`
              }
            })
          }
        }

        const updateQuery = User.findOneAndUpdate({ username }, data, {
          new: true
        })
        const updatedUser = await updateQuery.exec()

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
            user: updatedUser.getFullData()
          }
        })
      } catch (err) {
        res.sendStatus(500)
      }
    }
  )
}
