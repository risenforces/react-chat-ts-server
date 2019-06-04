const chalk = require('chalk')
const { env } = require('@config')
const { withHHMM, withIndent } = require('./helpers')

const attachmentPipe = [
  // format json
  (prev, { type }) => {
    if (type === 'json') {
      const parsed = JSON.parse(prev)
      return JSON.stringify(parsed, null, 2)
    }

    return prev
  },
  // add prefix
  prev => 'Attachment: ' + prev,
  // add indentation
  prev => withIndent(prev, 2),
  // add line breaks
  prev => '\n' + prev + '\n'
]

/**
 * @param {Object} params
 *
 * @param {String} params.message
 *
 * @param {Array} [params.colors]
 *
 * @param {Object} [params.options]
 * @param {Boolean} [params.options.withoutTime]
 */
const log = ({ message, colors = [], options = {} }) => {
  const { withoutTime } = options

  const base = withoutTime ? message : withHHMM(message)
  const formatted = colors.reduce((msg, color) => color(msg), base)

  console.log(formatted)
}

const Log = {
  success: message => log({ message, colors: [chalk.green] }),
  warning: message => log({ message, colors: [chalk.yellow] }),
  failure: message => log({ message, colors: [chalk.red] }),
  neutral: message => log({ message, colors: [chalk.white] }),

  /**
   * @param {String} message
   *
   * @param {Object} [options]
   * @param {String} [options.attachment]
   */
  debug: (message, options = {}) => {
    if (!env.isDev) return

    const { attachment } = options

    log({ message, colors: [chalk.blue] })

    if (attachment) {
      const { data, type } = attachment

      let result = data
      const options = { type }

      for (let fn of attachmentPipe) {
        result = fn(result, options)
      }

      log({
        message: result,
        colors: [chalk.white],
        options: { withoutTime: true }
      })
    }
  }
}

module.exports = Log
