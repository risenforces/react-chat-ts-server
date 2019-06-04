module.exports = schema => {
  return ({ parsedMessage, actions, next }) => {
    const { payload } = parsedMessage

    try {
      schema.validateSync(payload, {
        strict: true
      })

      return next()
    } catch (err) {
      const error = err.errors
        ? err.errors[0]
        : {
            code: '#common/UNKNOWN',
            message: 'Unknown error'
          }

      return actions.reply.failure(error)
    }
  }
}
