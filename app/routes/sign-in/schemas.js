const Yup = require('yup')

module.exports = {
  '/': {
    post: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    })
  }
}
