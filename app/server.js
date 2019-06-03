const express = require('express')
const app = express()

require('./setup')

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const { useRoutes } = require('./routes')
useRoutes(app)

const { useWS } = require('./socket')
const server = useWS(app, '/ws')

module.exports = server
