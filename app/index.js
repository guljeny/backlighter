require('module-alias/register')
const bootstrapApi = require('$app/api')
const bootstrapStaticServer = require('$app/bootstrapStaticServer')
const bootstrapSockets = require('./sockets')
const initApplication = require('./initApplication')
const logger = require('$utils/logger')


initApplication(() => {
  bootstrapApi()
  bootstrapStaticServer()
  bootstrapSockets()
  logger('starting app', '...')

  // const server = app.listen(process.env.PORT || 80)

  // const io = socketIO.listen(server)
})
