const app = require('$app/app')
const { register, login, get, logout } = require('./user')
const { add, list, update, updateFirmware } = require('./devise')
const translations = require('./translations')

module.exports = function bootstrapApi () {
  app.get('/api/user/get', get)
  app.post('/api/user/register', register)
  app.post('/api/user/login', login)
  app.get('/api/user/logout', logout)
  app.get('/api/devise/add', add)
  app.get('/api/devise/list', list)
  app.post('/api/devise/update', update)
  app.post('/api/devise/update_firmware', updateFirmware)
  app.get('/api/translations/:locale', translations)
}
