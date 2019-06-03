const { API: RedisAPI } = require('@app/redis')
const Log = require('@app/helpers/Log')

exports.processConnect = ({ socket, userId }) => {
  RedisAPI.userSockets.push(userId, socket.id).then(nextSockets => {
    Log.debug(`${userId} connected (${nextSockets.length} connections in total)`)

    /* 
      This is the first user's connection
      Setting his online status to true
    */
    if (nextSockets.length === 1) {
      RedisAPI.userOnline.set(userId, true)
      Log.debug(`${userId} went online`)
    }
  })
}
