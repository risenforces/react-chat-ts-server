exports.roles = ['user', 'moder', 'admin', 'creator']
exports.defaultRole = 'user'

exports.matches = {
  user: ['user', 'moder', 'admin', 'creator'],
  moder: ['moder', 'admin', 'creator'],
  admin: ['admin', 'creator'],
  creator: ['creator']
}
