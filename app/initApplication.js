const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const { mongoConnectionUrl } = require('$config')
const db = require('$db')

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

async function initApplication (callback) {
  const err = await db.connect()
  if (err) throw new Error(err)
  callback(app)
}

module.exports = initApplication
