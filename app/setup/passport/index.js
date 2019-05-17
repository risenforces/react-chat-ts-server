const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const { User } = require('@app/db/models')

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.SECRET
    },
    async (jwtPayload, done) => {
      const { _id } = jwtPayload

      const userQuery = User.findById(_id)
      try {
        const user = await userQuery.exec()
        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)
