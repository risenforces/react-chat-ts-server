const mongoose = require('mongoose')
const Log = require('@app/helpers/Log')

// fix some options
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

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
