require('module-alias/register')

const fs = require('fs')

const { logsFolder } = require('@config')

// create logs folder on the first run
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder)
}

module.exports = {
  apps: [
    {
      name: 'react-chat-ts-server',
      script: 'app',

      exec_mode: 'cluster',
      instances: 'max',

      error_file: `${logsFolder}/server.log`,
      out_file: `${logsFolder}/server.log`,
      merge_logs: true
    }
  ]
}
