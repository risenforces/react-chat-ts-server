const { get, set, remove, custom, parsers } = require('../helpers')

exports.userSockets = {
  /**
   * @param {String} userId - User's ObjectId
   */
  get: userId =>
    get({
      path: ['users', 'sockets', userId],
      parse: parsers.array
    }),

  /**
   * @param {String} userId - User's ObjectId
   * @param {String} socketId - Added socket id
   *
   * @returns {Promise<Array>} - Updated array of user's sockets
   */
  push: (userId, socketId) =>
    custom({
      path: ['users', 'sockets', userId],
      fn: async ({ key, asyncActions }) => {
        const json = await asyncActions.get(key)
        const currentSockets = json ? JSON.parse(json) : []

        const nextSockets = currentSockets.concat(socketId)
        const nextSocketsJson = JSON.stringify(nextSockets)

        await asyncActions.set(key, nextSocketsJson)

        return nextSockets
      }
    }),

  /**
   * @param {String} userId - User's ObjectId
   * @param {String} socketId - Removed socket id
   *
   * @returns {Promise<Array>} - Updated array of user's sockets
   */
  pull: (userId, socketId) =>
    custom({
      path: ['users', 'sockets', userId],
      fn: async ({ key, asyncActions }) => {
        const json = await asyncActions.get(key)
        const currentSockets = json ? JSON.parse(json) : []

        const nextSockets = currentSockets.filter(sId => sId !== socketId)

        if (nextSockets.length > 0) {
          const nextSocketsJson = JSON.stringify(nextSockets)
          await asyncActions.set(key, nextSocketsJson)
        } else {
          await asyncActions.remove(key)
        }

        return nextSockets
      }
    }),

  /**
   * @param {String} userId - User's ObjectId
   */
  remove: userId =>
    remove({
      path: ['users', 'sockets', userId]
    })
}

exports.userOnline = {
  /**
   * @param {String} userId - User's ObjectId
   */
  get: userId =>
    get({
      path: ['users', 'online', userId],
      parse: parsers.boolean
    }),

  /**
   * @param {String} userId - User's ObjectId
   * @param {Boolean} value - New user's online status
   */
  set: (userId, value) =>
    set({
      path: ['users', 'online', userId],
      value
    }),

  /**
   * @param {String} userId - User's ObjectId
   */
  remove: userId =>
    remove({
      path: ['users', 'online', userId]
    })
}
