module.exports = role => ({ user, actions, next }) => {
  const result = user.matchesRole(role)

  if (!result) {
    return actions.reply.failure({
      code: '#common/NO_ACCESS',
      message: 'You have no access to perform this action'
    })
  }

  return next()
}
