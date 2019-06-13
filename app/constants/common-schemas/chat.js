const Yup = require('yup')
const { accessModes: chatAccessModes } = require('../chat-access-modes')

const AccessMode = Yup.string().oneOf(chatAccessModes)

module.exports = {
  AccessMode
}
