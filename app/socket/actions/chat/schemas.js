const Yup = require('yup')
const { generalSchemas, chatSchemas } = require('@common-schemas')

exports.CreateChat = Yup.object()
  .shape({
    name: generalSchemas.Name.nullable().required(),
    title: Yup.string().required(),
    accessMode: chatSchemas.AccessMode.required()
  })
  .noUnknown()
