const register = require('./register')

function bootstrapApi (app) {
  app.post('/api/register', register)
}

module.exports = bootstrapApi
