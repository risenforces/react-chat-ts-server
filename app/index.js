require('module-alias/register')
require('dotenv').config()

const { dbName } = require('@config')

const server = require('./server')
const connectMongoDB = require('./db/connect')

const Log = require('./helpers/Log')

const port = parseInt(process.env.PORT, 10) || 3030

connectMongoDB({ dbName })
  .then(() => {
    const connectRedis = require('./redis/connect')

    return connectRedis()
  })
  .then(() => {
    server.listen(port, () => {
      Log.success(`Listening on port ${port}`)
    })
  })
  .catch(() => {
    Log.failure('Failed to start server')
  })
