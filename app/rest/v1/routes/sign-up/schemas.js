const Yup = require('yup')

const { generalSchemas, userSchemas } = require('@common-schemas')

module.exports = {
  signUp: {
    body: Yup.object().shape({
      username: generalSchemas.Name.required(),
      password: userSchemas.Password.required()
    })
  }
}
