/**
 * @param {String} str
 * @param {Number} spaces - Indentation length
 *
 * @returns {String}
 */
exports.withIndent = (str, spaces) => {
  const indent = ' '.repeat(spaces)

  const lines = str.split(/(?:\r\n|\r|\n)/)

  return lines.map(line => indent + line).join('\n')
}

/**
 * @param {String} str
 *
 * @returns {String}
 */
exports.withHHMM = str => {
  const date = new Date()

  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  const hh = '0'.repeat(2 - hours.length) + hours
  const mm = '0'.repeat(2 - minutes.length) + minutes

  return `[${hh}:${mm}] ${str}`
}
