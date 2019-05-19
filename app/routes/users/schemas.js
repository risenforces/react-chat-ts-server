const Yup = require('yup')

const {
  UserDataSchema,
  EditableUserDataSchema
} = require('@app/constants/common-schemas')

const ParamsSchema = Yup.object().shape({
  username: Yup.string().required()
})

module.exports = {
  getUser: {
    params: ParamsSchema
  },
  createUser: {
    body: Yup.object().shape({
      data: UserDataSchema.required(),
      ignoreReserved: Yup.boolean()
    })
  },
  editUser: {
    params: ParamsSchema,
    body: Yup.object().shape({
      data: UserDataSchema.required(),
      ignoreReserved: Yup.boolean()
    })
  },
  editMe: {
    body: Yup.object().shape({
      data: EditableUserDataSchema.required()
    })
  }
}
