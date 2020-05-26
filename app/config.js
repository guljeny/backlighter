const req = require('require-yml')

const config = req('./config.yml')

const user = encodeURIComponent(config.db_user)
const password = encodeURIComponent(config.db_password)
const mongoConnectionUrl = `mongodb://${user}:${password}@${config.db_url}/?authMechanism=DEFAULT`
module.exports = {
  ...config,
  mongoConnectionUrl,
}
