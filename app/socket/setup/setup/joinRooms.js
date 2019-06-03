const Log = require('@app/helpers/Log')

const { ChatMember } = require('@app/db/models')

exports.joinRooms = async ({ socket, userId }) => {
  /* 
    Join the chats
  */

  const userChatsQuery = ChatMember.find({ userId })
  const userChats = await userChatsQuery.exec()

  for (let chat of userChats) {
    const { chatId } = chat

    const roomId = 'chat-' + chatId

    socket.join(roomId, () => {
      Log.debug(`${userId} joined room ${roomId}`)

      socket.to(roomId).send(
        JSON.stringify({
          event: '@users/online',
          payload: {
            userId
          }
        })
      )
    })
  }
}
