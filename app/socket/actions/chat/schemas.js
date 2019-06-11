const Yup = require('yup')
const { NameSchema, ChatAccessModeSchema } = require('@app/constants/common-schemas')

exports.CreateChat = Yup.object()
  .shape({
    name: NameSchema.nullable().required(),
    title: Yup.string().required(),
    accessMode: ChatAccessModeSchema.required()
  })
  .noUnknown()