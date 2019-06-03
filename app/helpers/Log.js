const chalk = require('chalk')
const { env } = require('@config')

const withHHMM = message => {
  const date = new Date()

  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  const hh = '0'.repeat(2 - hours.length) + hours
  const mm = '0'.repeat(2 - minutes.length) + minutes

  return `[${hh}:${mm}] ${message}`
}

const log = (message, colors, { withoutTime } = {}) => {
  const base = withoutTime ? message : withHHMM(message)
  const formatted = colors.reduce((msg, color) => color(msg), base)
  console.log(formatted)
}

const Log = {
  success: message => log(message, [chalk.green]),
  warning: message => log(message, [chalk.yellow]),
  failure: message => log(message, [chalk.red]),
  neutral: message => log(message, [chalk.white]),
  debug: (message, { attachment } = {}) => {
    if (!env.isDev) return
    log(message, [chalk.blue])

    if (attachment) {
      let formatted = attachment.data
      if (attachment.type === 'json') {
        const parsed = JSON.parse(attachment.data)
        formatted = JSON.stringify(parsed, null, 2)
        formatted
      }

      formatted = formatted.replace(/(?:\r\n|\r|\n)/g, '\n  ')

      log(`\n  Attachment: ${formatted}\n`, [chalk.white], { withoutTime: true })
    }
  }
}

module.exports = Log
