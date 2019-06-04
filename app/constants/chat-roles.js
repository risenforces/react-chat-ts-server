exports.roles = ['member', 'moder', 'admin', 'owner']
exports.defaultRole = 'member'

exports.matches = {
  member: ['member', 'moder', 'admin', 'owner'],
  moder: ['moder', 'admin', 'owner'],
  admin: ['admin', 'owner'],
  owner: ['owner']
}
