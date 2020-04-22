const app = require('express')()
const socketIO = require('socket.io')
const path = require('path')
const { MongoClient } = require('mongodb')
const config = require('../src/config')

const url = `mongodb://${config.db_user}:${config.db_password}@${config.db_url}/?authMechanism=DEFAULT`
const client = new MongoClient(url)

client.connect(() => {
  console.log('Connected correctly to server')
  client.close()
})

let en = false

app.get('/', (req, res) => {
  console.log('request')
  res.sendFile(path.join(__dirname, '../src/client/index.html'))
})

app.get('/build/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/bundle.js'))
})

const server = app.listen(process.env.PORT || 3000)

const io = socketIO.listen(server)

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('toggle-enable', en)
  socket.on('toggle-enable', next => {
    en = next
    socket.emit('toggle-enable', en)
    socket.broadcast.emit('toggle-enable', en)
    console.log(en)
  })
})
