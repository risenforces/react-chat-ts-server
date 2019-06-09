const noAccessRes = {
  status: 'failure',
  error: {
    code: '#common/NO_ACCESS',
    message: 'You are not allowed to perform this action'
  }
}

const check = (user, roles) => {
  if (!user) return false

  const plain = user.toObject()

  return roles.includes(plain.role)
}

const moder = (req, res, next) => {
  if (!check(req.user, ['moder', 'admin'])) {
    return res.send(noAccessRes)
  }

  return next()
}

const admin = (req, res, next) => {
  if (!check(req.user, ['admin'])) {
    return res.send(noAccessRes)
  }

  return next()
}

module.exports = {
  moder,
  admin
}
