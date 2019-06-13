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

const actions = {}
const middlewares = {}

/**
 * @param {String} groupName
 * @param  {...Handler} groupMiddlewares
 */
const createActionGroup = (groupName, ...groupMiddlewares) => {
  middlewares[groupName] = groupMiddlewares

  /**
   * @param {String} actionName
   * @param  {...Handler} handlers
   */
  const addAction = (actionName, ...handlers) => {
    actions[groupName + '/' + actionName] = handlers
  }

  /**
   * @param {String} subGroupName
   * @param  {...Handler} groupMiddlewares
   */
  const createSubGroup = (subGroupName, ...groupMiddlewares) => {
    return createActionGroup(`${groupName}/${subGroupName}`, ...groupMiddlewares)
  }

  return {
    addAction,
    createSubGroup
  }
}

const get = action => {
  let result = []

  const groupPath = action.split('/').slice(0, -1)

  let current = ''
  for (let segment of groupPath) {
    current += !current ? segment : '/' + segment
    result = result.concat(middlewares[current])
  }

  return result.concat(actions[action])
}

module.exports = {
  get,
  createActionGroup
}
