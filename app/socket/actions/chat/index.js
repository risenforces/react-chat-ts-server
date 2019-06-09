const { storage } = require('@app/socket/actions')
const { validatePayload, hasNoBan } = require('@socket-middlewares')
const schemas = require('./schemas')

const chatGroup = storage.createActionGroup('@chat')

chatGroup.addAction('create', validatePayload(schemas.CreateChat), hasNoBan(), async ({ actions }) => {
  // 
})
