const Yup = require('yup')
const { Name, Role } = require('./general')

const Password = Yup.string()
  .min(8)
  .max(64)
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/)

const Data = Yup.object()
  .shape({
    username: Name,
    password: Password,
    role: Role
  })
  .noUnknown()

const EditableData = Yup.object()
  .shape({
    username: Name,
    password: Password
  })
  .noUnknown()

module.exports = {
  Password,
  Data,
  EditableData
}
