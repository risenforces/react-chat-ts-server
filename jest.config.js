require('module-alias/register')

module.exports = {
  rootDir: '.',
  testRegex: '\\.test\\.js',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@socket-middlewares$': '<rootDir>/app/socket/middlewares',
    '^@config$': '<rootDir>/app.config.js'
  }
}
