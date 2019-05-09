const paths = []

module.exports = {
  rootDir: '.',
  testRegex: '(' + paths.map(path => `${path}/.*.js`).join('|') + ')$',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/app$1',
    '^@config$': '<rootDir>/app.config.js'
  }
}
