const app = require('$app/app')
const user = require('./user')
const device = require('./device')
const translations = require('./translations')

module.exports = function bootstrapApi () {
  app.get('/api/user', user.get)
  app.post('/api/user/register', user.register)
  app.post('/api/user/login', user.login)
  app.get('/api/user/logout', user.logout)
  app.post('/api/device/add', device.add)
  app.get('/api/device/list', device.list)
  app.post('/api/device/update', device.update)
  app.post('/api/device/update_firmware', device.updateFirmware)
  app.get('/api/translations/:locale', translations)
}
