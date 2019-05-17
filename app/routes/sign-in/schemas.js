const Yup = require('yup')

module.exports = {
  signIn: {
    body: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    })
  }
}
