const Yup = require('yup')

const {
  UsernameSchema,
  PasswordSchema
} = require('@app/constants/common-schemas')

module.exports = {
  '/': {
    post: Yup.object().shape({
      username: UsernameSchema,
      password: PasswordSchema
    })
  }
}
