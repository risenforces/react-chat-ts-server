module.exports = () => ({ user, actions, next }) => {
  const hasBan = user.isBanned()

  if (hasBan) {
    return actions.reply.failure({
      code: '#common/BAN',
      message: 'You are banned'
    })
  }

  return next()
}
