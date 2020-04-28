const app = require('$app/app')
const { register, login, user, logout } = require('./user')
const { add } = require('./devise')
const translations = require('./translations')

module.exports = function bootstrapApi () {
  app.get('/api/user', user)
  app.post('/api/user/register', register)
  app.post('/api/user/login', login)
  app.get('/api/user/logout', logout)
  app.get('/api/devise/add', add)
  app.get('/api/translations/:locale', translations)
}
