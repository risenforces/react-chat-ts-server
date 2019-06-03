class ParseError extends Error {}

const parseMessage = message => {
  if (typeof message !== 'string') {
    throw new ParseError('Message must be a string')
  }

  if (message.length === 0) {
    throw new ParseError('Message must not be empty')
  }

  let data
  try {
    data = JSON.parse(message)
  } catch (err) {
    throw new ParseError('Cannot parse message')
  }

  if (!data.action) {
    throw new ParseError('Each message must have action type')
  }

  if (!data.requestId) {
    throw new ParseError('Each message must have request id')
  }

  return data
}

module.exports = parseMessage
