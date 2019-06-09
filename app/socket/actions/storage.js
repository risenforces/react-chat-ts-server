/**
 * @typedef {function({
 *   io: *,
 *   socket: *,
 *   user: *,
 *   parsedMessage: {
 *     action: String,
 *     requestId: Number,
 *     payload: Object.<string, *>
 *   },
 *   actions: {
 *     reply: {
 *       success: ReplyWithSuccess,
 *       failure: ReplyWithFailure
 *     },
 *     broadcast: {
 *       all: BroadcastToAll,
 *       room: BroadcastToRoom
 *     }
 *   },
 *   next: function(): void
 * })} Handler
 */

/**
 * @callback ReplyWithSuccess
 * @param {Object.<string, *>} payload
 * @returns {void}
 */

/**
 * @typedef {function({
 *   code: String,
 *   message?: String,
 *   params?: Object.<string, *>
 * }): void} ReplyWithFailure
 */

/**
 * @typedef {function({
 *   event: String,
 *   payload?: Object.<string, *>
 * }): void} BroadcastToAll
 */

/**
 * @callback BroadcastToRoom
 * @param {String} roomId
 * @param {{
 *   event: String,
 *   payload?: Object.<string, *>
 * }} data
 * @returns {void}
 */

const actions = new Map()

const createActionGroup = groupName => {
  /**
   * @param {String} actionName
   * @param  {...Handler} handlers
   */
  const addAction = (actionName, ...handlers) => {
    actions.set(`${groupName}/${actionName}`, handlers)
  }

  const createSubGroup = subGroupName => {
    return createActionGroup(`${groupName}/${subGroupName}`)
  }

  return {
    addAction,
    createSubGroup
  }
}

const get = action => actions.get(action) || null

module.exports = {
  get,
  createActionGroup
}

createActionGroup('vasya').addAction('hello', ({}) => {
  actions.broadcast.room('my-room', {
    event,
    
  })
})
