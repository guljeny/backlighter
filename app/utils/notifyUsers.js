const { usersStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')
const { user: { UPDATE_DEVISE } } = require('$app/sockets/actions')

module.exports = function (userId) {
  const users = usersStore.findByUserId(userId)
  return {
    deviseUpdate: (uid, values) => {
      if (!users) return
      users.forEach(({ socketId }) => {
        socketIO.to(socketId).emit(UPDATE_DEVISE, { uid, ...values })
      })
    },
  }
}
