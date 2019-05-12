require('module-alias/register')

module.exports = {
  rootDir: '.',
  testRegex: '\\.test\\.js',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@config$': '<rootDir>/app.config.js'
  }
}
