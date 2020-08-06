const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const { mongoConnectionUrl } = require('$config')
const response = require('$utils/response')

const store = new MongoDBStore({
  uri: mongoConnectionUrl,
  databaseName: 'main',
  collection: 'sessions',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'mongo-session-secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
    httpOnly: false,
  },
  store,
  resave: true,
  saveUninitialized: true,
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use((req, res, next) => {
  res.sendStatus = {
    success: data => response.success(res, data),
    unauthorized: () => response.unauthorized(res),
    unprocessableEntity: errors => response.unprocessableEntity(res, errors),
    notFound: errors => response.notFound(res, errors),
  }
  next()
})

module.exports = app
