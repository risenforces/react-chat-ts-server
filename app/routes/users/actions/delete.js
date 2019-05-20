const { User } = require('@app/db/models')

const validate = require('@app/middlewares/validate')
const schemas = require('../schemas')
const roles = require('@app/middlewares/roles')

exports.setupDelete = router => {
  router.delete('/me', validate(schemas.deleteMe), async (req, res) => {
    const { user: currentUser } = req
    const { username } = currentUser.getFullData()

    try {
      const deleteQuery = User.findOneAndDelete({ username })
      const deleteResult = await deleteQuery.exec()

      if (!deleteResult) {
        return res.send({
          status: 'failure',
          error: {
            code: '@users/USER_NOT_FOUND',
            message: 'User not found'
          }
        })
      }

      return res.send({
        status: 'success'
      })
    } catch (err) {
      res.sendStatus(500)
    }
  })

  router.delete(
    '/:username',
    roles.admin,
    validate(schemas.deleteUser),
    async (req, res) => {
      const { username } = req.params

      try {
        const deleteQuery = User.findOneAndDelete({ username })
        const deleteResult = await deleteQuery.exec()

        if (!deleteResult) {
          return res.send({
            status: 'failure',
            error: {
              code: '@users/USER_NOT_FOUND',
              message: 'User not found'
            }
          })
        }

        return res.send({
          status: 'success'
        })
      } catch (err) {
        res.sendStatus(500)
      }
    }
  )
}
