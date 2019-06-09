const express = require('express')
const app = express()

require('./general-setup')

const { useREST } = require('./rest')
useREST.v1(app, '/api/v1')

const { useWS } = require('./socket')
const server = useWS(app, '/ws')

module.exports = server
