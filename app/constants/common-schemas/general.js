const Yup = require('yup')
const { roles: generalRoles } = require('../general-roles')
const reservedNames = require('../reserved-names')

const Name = Yup.string()
  .min(2)
  .max(16)
  .matches(/^[a-z0-9_.-]*$/)
  .notOneOf(reservedNames)

const Role = Yup.string().oneOf(generalRoles)

module.exports = {
  Name,
  Role
}
