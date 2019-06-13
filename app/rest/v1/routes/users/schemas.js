const Yup = require('yup')

const { userSchemas } = require('@common-schemas')

const ParamsSchema = Yup.object().shape({
  username: Yup.string().required()
})

module.exports = {
  getMe: {},
  getUser: {
    params: ParamsSchema
  },
  createUser: {
    body: Yup.object().shape({
      data: userSchemas.Data.required(),
      ignoreReserved: Yup.boolean()
    })
  },
  editMe: {
    body: Yup.object().shape({
      data: userSchemas.EditableData.required()
    })
  },
  editUser: {
    params: ParamsSchema,
    body: Yup.object().shape({
      data: userSchemas.Data.required(),
      ignoreReserved: Yup.boolean()
    })
  },
  deleteMe: {},
  deleteUser: {
    params: ParamsSchema
  },
  muteUser: {
    params: ParamsSchema,
    body: Yup.object().shape({
      seconds: Yup.number()
        .integer()
        .min(1)
        .required()
    })
  },
  unmuteUser: {
    params: ParamsSchema
  },
  banUser: {
    params: ParamsSchema
  },
  unbanUser: {
    params: ParamsSchema
  }
}
