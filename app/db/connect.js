const mongoose = require('mongoose')
const Log = require('@app/helpers/Log')

// findAndModify is deprecated
mongoose.set('useFindAndModify', false)

module.exports = ({ dbName }) => {
  return new Promise((resolve, reject) => {
    const connection = mongoose.connection

    connection.once('open', () => {
      Log.success(`Opened connection to DB "${dbName}"`)
      resolve()
    })

    connection.on('error', error => {
      Log.failure(error.toString())
      reject()
    })

    mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
  })
}
