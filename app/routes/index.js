exports.useRoutes = app => {
  const signIn = require('./sign-in')
  const signUp = require('./sign-up')

  app.use('/sign-in', signIn)
  app.use('/sign-up', signUp)
}
