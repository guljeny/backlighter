const { usersStore, deviseStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')

module.exports = {
  user: (id, action, data) => {
    const users = usersStore.findByUserId(id)
    if (!users) return
    users.forEach(({ socketId }) => {
      socketIO.to(socketId).emit(action, data)
    })
  },
  devise: (id, action, data) => {
    const socketId = deviseStore.findByUid(id)
    if (!socketId) return
    socketIO.to(socketId.last).emit(action, data)
  },
}
