const Log = require('@app/helpers/Log')

const { User } = require('@app/db/models')

const parseMessage = require('../../helpers/parseMessage')
const handleAction = require('../../helpers/handleAction')

exports.createMessageHandler = ({ io, socket, userId }) => {
  return async message => {
    Log.debug(`${userId} sent message`, {
      attachment: {
        data: message,
        type: 'json'
      }
    })

    let parsedMessage
    try {
      parsedMessage = parseMessage(message)
    } catch (err) {
      Log.debug('Failed to parse message')
      return
    }

    let user
    try {
      const userQuery = User.findById(userId)
      user = await userQuery.exec()
    } catch (err) {
      Log.debug('Cannot get user data')
      return
    }

    if (!user) {
      Log.debug('User not found')
      return
    }

    return handleAction({ io, socket, user, parsedMessage })
  }
}
