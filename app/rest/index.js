const { Router } = require('express')
const setupV1 = require('./v1')

exports.useREST = {
  v1: (app, path) => {
    const router = Router()

    setupV1(router)

    app.use(path, router)
  }
}
