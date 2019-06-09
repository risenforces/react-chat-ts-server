const cors = require('cors')
const bodyParser = require('body-parser')

exports.setup = router => {
  router.use(cors())
  router.use(bodyParser.json())
}
