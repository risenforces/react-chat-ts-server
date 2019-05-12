const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const env = {
  isDev,
  isProd,
  isTest
}

const dbName = 'react-chat-ts'

const logsFolder = './logs'

module.exports = {
  env,
  dbName,
  logsFolder
}
