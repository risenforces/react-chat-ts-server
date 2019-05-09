const chalk = require('chalk')

const withHHMM = message => {
  const date = new Date()

  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  const hh = '0'.repeat(2 - hours.length) + hours
  const mm = '0'.repeat(2 - minutes.length) + minutes

  return `[${hh}:${mm}] ${message}`
}

const log = (message, color) => {
  const formatted = color(withHHMM(message))
  console.log(formatted)
}

const Log = {
  success: message => log(message, chalk.green),
  failure: message => log(message, chalk.red),
  neutral: message => log(message, chalk.white)
}

module.exports = Log
