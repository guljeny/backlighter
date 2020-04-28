const socketIO = require('socket.io')
const server = require('./server')

module.exports = socketIO.listen(server)
