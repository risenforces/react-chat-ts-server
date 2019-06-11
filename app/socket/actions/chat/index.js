const { storage } = require('@app/socket/actions')
const { validatePayload, hasNoBan } = require('@socket/middlewares')
const schemas = require('./schemas')

const chatGroup = storage.createActionGroup('@chat', hasNoBan())

chatGroup.addAction('create', validatePayload(schemas.CreateChat), async ({ actions }) => {
  // 
})

module.exports = {
  chatGroup
}
