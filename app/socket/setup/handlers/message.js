const Log = require('@app/helpers/Log')

const parseMessage = require('../../helpers/parseMessage')
const handleAction = require('../../helpers/handleAction')

exports.createMessageHandler = ({ io, socket, userId }) => {
  return message => {
    Log.debug(`${userId} sent message`, {
      attachment: {
        data: message,
        type: 'json'
      }
    })

    try {
      const parsedMessage = parseMessage(message)
      return handleAction({ io, socket, userId, parsedMessage })
    } catch (err) {
      Log.debug('Failed to parse message')
    }
  }
}
