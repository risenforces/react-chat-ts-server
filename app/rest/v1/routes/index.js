const { auth } = require('@rest-v1/middlewares')

exports.useRoutes = router => {
  const signIn = require('./sign-in')
  const signUp = require('./sign-up')
  const users = require('./users')

  router.use('/sign-in', signIn)
  router.use('/sign-up', signUp)
  router.use('/users', auth, users)

  return router
}
