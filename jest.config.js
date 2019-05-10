require('module-alias/register')

const { testsFolders } = require('@config')

module.exports = {
  rootDir: '.',
  testRegex: '(' + testsFolders.map(path => `${path}/.*.js`).join('|') + ')$',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@config$': '<rootDir>/app.config.js'
  }
}
