require('module-alias/register')
const bootstrapApi = require('$app/api')
const bootstrapStaticServer = require('$app/bootstrapStaticServer')
const bootstrapSockets = require('./sockets')
const initApplication = require('./initApplication')

initApplication(() => {
  bootstrapApi()
  bootstrapStaticServer()
  bootstrapSockets()
})
