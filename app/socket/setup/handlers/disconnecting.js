const Log = require('@app/helpers/Log')
const { API: RedisAPI } = require('@app/redis')

exports.createDisconnectingHandler = ({ socket, userId }) => {
  return () => {
    RedisAPI.userSockets.pull(userId, socket.id).then(nextSockets => {
      Log.debug(`${userId} disconnected (${nextSockets.length} connections in total)`)

      // User is still online
      if (nextSockets.length > 0) {
        return
      }

      /*
        The last user's connection is going to be destroyed
      */

      Log.debug(`${userId} went offline`)

      // Remove online status
      RedisAPI.userOnline.remove(userId)

      // Notify the rooms
      for (let roomId in socket.rooms) {
        socket.to(roomId).send(
          JSON.stringify({
            event: '@users/offline',
            payload: {
              userId
            }
          })
        )
      }
    })
  }
}
