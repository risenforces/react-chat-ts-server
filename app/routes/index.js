const auth = require('@app/middlewares/auth')

exports.useRoutes = app => {
  const signIn = require('./sign-in')
  const signUp = require('./sign-up')
  const users = require('./users')

  app.use('/sign-in', signIn)
  app.use('/sign-up', signUp)
  app.use('/users', auth, users)

  return app
}
