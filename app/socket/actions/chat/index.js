const { storage } = require('@app/socket/actions')
const { hasNoBan } = require('@socket-middlewares')

const chatGroup = storage.createActionGroup('@chat')

chatGroup.addAction('create', hasNoBan())
