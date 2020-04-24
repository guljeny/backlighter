require('module-alias/register')
const app = require('express')()
const socketIO = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bootstrapApi = require('$app/api')
const { mongoConnectionUrl } = require('$config')
const initApplication = require('./initApplication')

const store = new MongoDBStore({
  uri: mongoConnectionUrl,
  databaseName: 'main',
  collection: 'sessions',
})

let en = false

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'mongo-session-secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
  },
  store,
  resave: true,
  saveUninitialized: true,
}))

initApplication(() => {
  console.log('starting app ...')
  bootstrapApi(app)
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'))
  })

  app.get('/bundle.js', (req, res) => {
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
