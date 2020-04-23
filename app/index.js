const app = require('express')()
const socketIO = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')
const bootstrapApi = require('$app/api')
const initApplication = require('./initApplication')

let en = false

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

initApplication(() => {
  bootstrapApi(app)
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/client/index.html'))
  })

  app.get('/build/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/bundle.js'))
  })

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
