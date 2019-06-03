const { processConnect } = require('./setup/connect')
const { joinRooms } = require('./setup/joinRooms')
const { createDisconnectingHandler } = require('./handlers/disconnecting')
const { createMessageHandler } = require('./handlers/message')

module.exports = {
  setup: {
    processConnect,
    joinRooms
  },
  createHandler: {
    disconnecting: createDisconnectingHandler,
    message: createMessageHandler
  }
}
