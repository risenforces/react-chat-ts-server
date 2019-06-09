const Yup = require('yup')
const reservedNames = require('./reserved-names')
const { roles: generalRoles } = require('./general-roles')
const { accessModes: chatAccessModes } = require('./chat-access-modes')

const NameSchema = Yup.string()
  .min(2)
  .max(16)
  .matches(/^[a-z0-9_.-]*$/)
  .notOneOf(reservedNames)

const PasswordSchema = Yup.string()
  .min(8)
  .max(64)
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/)

const RoleSchema = Yup.string().oneOf(generalRoles)

const UserDataSchema = Yup.object()
  .shape({
    username: NameSchema,
    password: PasswordSchema,
    role: RoleSchema
  })
  .noUnknown()

const EditableUserDataSchema = Yup.object()
  .shape({
    username: NameSchema,
    password: PasswordSchema
  })
  .noUnknown()

const ChatAccessModeSchema = Yup.string().oneOf(chatAccessModes)

module.exports = {
  NameSchema,
  PasswordSchema,
  RoleSchema,
  UserDataSchema,
  EditableUserDataSchema,
  ChatAccessModeSchema
}
