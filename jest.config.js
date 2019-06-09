require('module-alias/register')

module.exports = {
  rootDir: '.',
  testRegex: '\\.test\\.js',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@rest-v1-middlewares$': '<rootDir>/app/rest/v1/middlewares',
    '^@socket-middlewares$': '<rootDir>/app/socket/middlewares',
    '^@config$': '<rootDir>/app.config.js'
  }
}
