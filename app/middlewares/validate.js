const validate = (key, schema) => {
  return (req, res, next) => {
    const value = req[key]

    try {
      schema.validateSync(value, {
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
