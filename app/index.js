require('module-alias/register')
const socketIO = require('socket.io')
const bootstrapApi = require('$app/api')
const bootstrapStaticServer = require('$app/bootstrapStaticServer')
const initApplication = require('./initApplication')
const logger = require('$utils/logger')

let en = false

initApplication(app => {
  bootstrapApi(app)
  bootstrapStaticServer(app)
  logger('starting app', '...')

  const server = app.listen(process.env.PORT || 3000)

  const io = socketIO.listen(server)

  io.on('connection', socket => {
    socket.emit('toggle-enable', en)
    socket.on('toggle-enable', next => {
      en = next
      socket.emit('toggle-enable', en)
      socket.broadcast.emit('toggle-enable', en)
    })
  })
})
