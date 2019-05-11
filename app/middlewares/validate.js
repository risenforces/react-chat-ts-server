const validate = schema => {
  return (req, res, next) => {
    const { body } = req

    try {
      schema.validateSync(body, {
        strict: true
      })
    } catch (err) {
      const error = err.errors
        ? err.errors[0]
        : {
            code: '#common/UNKNOWN',
            message: 'Unknown error'
          }

      return res.send({
        status: 'failure',
        error
      })
    }

    return next()
  }
}

module.exports = validate
