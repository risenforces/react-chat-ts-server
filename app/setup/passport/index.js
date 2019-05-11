const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.SECRET
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload)
    }
  )
)
