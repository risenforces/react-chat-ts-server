const { User } = require('@app/db/models')

const { validate } = require('@rest-v1/middlewares')
const schemas = require('../schemas')
const { roles } = require('@rest-v1/middlewares')

const setBanned = value => async (req, res) => {
  const { username } = req.params

  try {
    const updateQuery = User.findOneAndUpdate(
      { username },
      { 'status.banned': value },
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

exports.setupBan = router => {
  router.post(
    '/:username/ban',
    roles.moder,
    validate(schemas.banUser),
    setBanned(true)
  )

  router.post(
    '/:username/unban',
    roles.moder,
    validate(schemas.unbanUser),
    setBanned(false)
  )
}
