require('module-alias/register')
require('dotenv').config()

const { dbName } = require('@config')

const app = require('@app/app')
const connect = require('@app/db/connect')

const Log = require('@app/helpers/Log')

const port = parseInt(process.env.PORT, 10) || 3030

connect({ dbName })
  .then(() => {
    app.listen(port, () => {
      Log.success(`Listening on port ${port}`)
    })
  })
  .catch(() => {
    Log.failure('Failed to start server')
  })
