const { User } = require('@app/db/models')

const validate = require('@app/middlewares/validate')
const schemas = require('../schemas')
const roles = require('@app/middlewares/roles')

exports.setupMute = router => {
  router.post(
    '/:username/mute',
    roles.moder,
    validate(schemas.muteUser),
    async (req, res) => {
      const { username } = req.params
      const { seconds } = req.body

      try {
        const now = new Date()
        now.setSeconds(now.getSeconds() + seconds)

        const mutedUntil = now.toISOString()

        const updateQuery = User.findOneAndUpdate(
          { username },
          { 'status.mutedUntil': mutedUntil },
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
          payload: updatedUser.getFullData()
        })
      } catch (err) {
        res.sendStatus(500)
      }
    }
  )

  router.post(
    '/:username/unmute',
    roles.moder,
    validate(schemas.unmuteUser),
    async (req, res) => {
      const { username } = req.params

      try {
        const updateQuery = User.findOneAndUpdate(
          { username },
          { 'status.mutedUntil': null },
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
          payload: updatedUser.getFullData()
        })
      } catch (err) {
        res.sendStatus(500)
      }
    }
  )
}
