exports.createHelpers = ({ socket, requestId }) => {
  const reply = {
    /**
     * @param {Object.<string, *>} [payload]
     */
    success: payload => {
      const res = {
        status: 'success',
        requestId,
        payload
      }

      socket.send(JSON.stringify(res))
    },

    /**
     * @param {Object} [error]
     * @param {String | Number} error.code
     * @param {String} [error.message]
     * @param {Object.<string, *>} [error.params]
     */
    failure: error => {
      const res = {
        status: 'failure',
        requestId,
        error
      }

      socket.send(JSON.stringify(res))
    }
  }

  const broadcast = {
    /**
     * @param {Object} data
     * @param {String} data.event
     * @param {Object.<string, *>} [data.payload]
     */
    all: data => {
      for (let roomId in socket.rooms) {
        socket.nsp.to(roomId).send(JSON.stringify(data))
      }
    },

    /**
     * @param {String} roomId
     * @param {Object} data
     * @param {String} data.event
     * @param {Object.<string, *>} [data.payload]
     */
    room: (roomId, data) => {
      socket.nsp.to(roomId).send(JSON.stringify(data))
    }
  }

  return { reply, broadcast }
}
