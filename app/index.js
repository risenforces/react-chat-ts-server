require('module-alias/register')
require('dotenv').config()

const Log = require('./helpers/Log')

const app = require('./app')

const port = parseInt(process.env.PORT, 10) || 3030

app.listen(port, () => {
  Log.success(`Listening on port ${port}`)
})
