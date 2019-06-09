const { Router } = require('express')
const router = Router()

const { setupGet } = require('./actions/get')
setupGet(router)

const { setupCreate } = require('./actions/create')
setupCreate(router)

const { setupEdit } = require('./actions/edit')
setupEdit(router)

const { setupDelete } = require('./actions/delete')
setupDelete(router)

const { setupMute } = require('./actions/mute')
setupMute(router)

const { setupBan } = require('./actions/ban')
setupBan(router)

module.exports = router
