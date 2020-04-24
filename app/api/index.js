const register = require('./register')
const login = require('./login')

function bootstrapApi (app) {
  app.post('/api/register', register)
  app.post('/api/login', login)
}

module.exports = bootstrapApi
