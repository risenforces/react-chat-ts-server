const SocketIO = require('socket.io')
const Log = require('@app/helpers/Log')

const { setup, createHandler } = require('./setup')

const checkAuth = require('./helpers/checkAuth')
const parseMessage = require('./helpers/parseMessage')

exports.useWS = (app, path) => {
  const server = require('http').createServer(app)

  const io = SocketIO(server, {
    path,
    handlePreflightRequest: (req, res) => {
      const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Credentials': true
      }
      res.writeHead(200, headers)
      res.end()
    }
  })

  io.on('connect', async socket => {
    const checkAuthRes = checkAuth(socket.handshake.headers, process.env.SECRET)

    if (!checkAuthRes.result) {
      return socket.disconnect()
    }

    const { _id: userId } = checkAuthRes.payload

    // Run some connect checks
    setup.processConnect({ socket, userId })

    // Setup disconnecting handler
    socket.on('disconnecting', createHandler.disconnecting({ socket, userId }))

    // Join the rooms (async)
    setup.joinRooms({ socket, userId })

    // Setup message handler
    socket.on('message', createHandler.message({ io, socket, userId }))
  })

  return server
}
