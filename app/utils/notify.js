const { usersStore, deviceStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')

module.exports = {
  user: (id, action, data) => {
    const users = usersStore.findByUserId(id)
    if (!users) return
    users.forEach(({ socketId }) => {
      socketIO.to(socketId).emit(action, data)
    })
  },
  device: (id, action, data) => {
    const socketId = deviceStore.findByUid(id)
    if (!socketId) return
    socketIO.to(socketId.last).emit(action, data)
  },
}
