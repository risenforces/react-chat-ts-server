const jwt = require('jsonwebtoken')

const AUTH_HEADER = 'authorization'
const AUTH_SCHEME = 'JWT'

const RE = /(\S+)\s+(\S+)/

const failure = { result: false }

const checkAuth = (headers, secret) => {
  const header = headers[AUTH_HEADER]

  if (typeof header !== 'string') {
    return failure
  }

  const matches = header.match(RE)

  if (!matches) {
    return failure
  }

  const [_, scheme, token] = matches

  if (scheme.toLowerCase() !== AUTH_SCHEME.toLowerCase()) {
    return failure
  }

  let payload
  try {
    payload = jwt.verify(token, secret)
  } catch (err) {
    return failure
  }

  return {
    result: true,
    payload
  }
}

module.exports = checkAuth