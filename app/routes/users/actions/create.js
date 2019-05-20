const { User } = require('@app/db/models')

const validate = require('@app/middlewares/validate')
const schemas = require('../schemas')
const roles = require('@app/middlewares/roles')

const reservedUsernames = require('@app/constants/reserved-usernames')

exports.setupCreate = router => {
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
              message: 'This username is already taken'
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
}
