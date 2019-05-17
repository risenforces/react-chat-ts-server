const Yup = require('yup')

const {
  UsernameSchema,
  PasswordSchema
} = require('@app/constants/common-schemas')

module.exports = {
  signUp: {
    body: Yup.object().shape({
      username: UsernameSchema.required(),
      password: PasswordSchema.required()
    })
  }
}
