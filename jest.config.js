require('module-alias/register')

module.exports = {
  rootDir: '.',
  testRegex: '\\.test\\.js',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@rest-v1(.*)$': '<rootDir>/app/rest/v1',
    '^@socket(.*)$': '<rootDir>/app/socket',
    '^@config$': '<rootDir>/app.config.js'
  }
}
