const Yup = require('yup')

const UsernameSchema = Yup.string()
  .min(2)
  .max(16)
  .matches(/^[a-zA-Z0-9_.-]*$/)

const PasswordSchema = Yup.string()
  .min(8)
  .max(64)
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/)

const RoleSchema = Yup.string().oneOf(['user', 'moder', 'admin'])

const UserDataSchema = Yup.object()
  .shape({
    username: UsernameSchema,
    password: PasswordSchema,
    role: RoleSchema
  })
  .noUnknown()

const EditableUserDataSchema = Yup.object()
  .shape({
    username: UsernameSchema,
    password: PasswordSchema
  })
  .noUnknown()

module.exports = {
  UsernameSchema,
  PasswordSchema,
  RoleSchema,
  UserDataSchema,
  EditableUserDataSchema
}
