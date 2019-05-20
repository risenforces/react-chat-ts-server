const { User } = require('@app/db/models')

const validate = require('@app/middlewares/validate')
const schemas = require('../schemas')

exports.setupGet = router => {
  router.get('/me', validate(schemas.getMe), async (req, res) => {
    const { user: currentUser } = req
  
    return res.send({
      status: 'success',
      payload: {
        user: currentUser.getFullData()
      }
    })
  })
  
  router.get('/:username', validate(schemas.getUser), async (req, res) => {
    const { user: currentUser } = req
    const { username } = req.params
  
    try {
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
}