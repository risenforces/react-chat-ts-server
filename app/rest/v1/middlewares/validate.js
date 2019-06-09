const validate = schemas => {
  return (req, res, next) => {
    for (let key in schemas) {
      const value = req[key]
      const schema = schemas[key]

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
    }

    return next()
  }
}

module.exports = validate
