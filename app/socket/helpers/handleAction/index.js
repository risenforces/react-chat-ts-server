const { createHelpers } = require('./helpers')
const { storage: actionsStorage } = require('../../actions')

const handleAction = async ({ io, socket, userId, parsedMessage }) => {
  const { action, requestId } = parsedMessage

  const { reply, broadcast } = createHelpers({ socket, requestId })

  const actionChain = actionsStorage.get(action)

  if (!actionChain) {
    return reply.failure({
      code: '#common/UNKNOWN_ACTION',
      message: `Action ${action} is not exist`
    })
  }

  const nextSymbol = Symbol('next')
  const next = () => nextSymbol

  for (let handler of actionChain) {
    const result = await handler({
      io,
      socket,
      userId,
      parsedMessage,
      actions: { reply, broadcast },
      next
    })

    // the handler did not return next()
    // the chain has completed / middleware stopped the chain
    if (result !== nextSymbol) break
  }
}

module.exports = handleAction
