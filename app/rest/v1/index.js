const { setup } = require('./setup')
const { useRoutes } = require('./routes')

module.exports = router => {
  setup(router)

  useRoutes(router)
}
