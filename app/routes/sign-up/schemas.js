const Yup = require('yup')

module.exports = {
  '/': {
    post: Yup.object().shape({
      username: Yup.string()
        .min(2)
        .max(16)
        .matches(/^[a-zA-Z0-9_.-]*$/)
        .required(),
      password: Yup.string()
        .min(8)
        .max(64)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/)
        .required()
    })
  }
}
