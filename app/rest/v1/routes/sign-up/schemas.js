const Yup = require('yup')

const {
  NameSchema,
  PasswordSchema
} = require('@common-schemas')

module.exports = {
  signUp: {
    body: Yup.object().shape({
      username: NameSchema.required(),
      password: PasswordSchema.required()
    })
  }
}
