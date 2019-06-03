const { createHelpers } = require('./helpers')
const { storage: actionsStorage } = require('../../actions')

const handleAction = ({ io, socket, userId, parsedMessage }) => {
  const { action, requestId } = parsedMessage

  const { reply, broadcast } = createHelpers({ socket, requestId })

  const actionFn = actionsStorage.get(action)

  if (!actionFn) {
    return reply.failure({
      code: '#common/UNKNOWN_ACTION',
      message: `Action ${action} is not exist`
    })
  }

  actionFn({
    io,
    socket,
    userId,
    parsedMessage,
    actions: { reply, broadcast }
  })
}

module.exports = handleAction
