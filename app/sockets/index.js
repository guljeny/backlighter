const io = require('$app/socketIO')
const Devise = require('$app/models/Devise')
const { devisesStore, usersStore } = require('./stores')
const {
  common: { VERIFY_OWNER },
  devise: { DEVISE_CONNECTION },
  user: { USER_CONNECTION, UPDATE_DEVISE },
} = require('./actions')
const { deviseConnection, verifyOwner, userConnection } = require('./listeners')

module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on(DEVISE_CONNECTION, data => deviseConnection(data, socket))
    socket.on(VERIFY_OWNER, () => verifyOwner(socket))
    socket.on(USER_CONNECTION, id => userConnection(id, socket))
    socket.on('disconnect', async () => {
      const uid = devisesStore.findBySocketId(socket.id)
      if (uid) {
        const deviseSockets = devisesStore.findByUid(uid)
        if (deviseSockets && deviseSockets.all.length === 1) {
          const devise = await Devise.findBy({ uid })
          devise.update({ isOnline: false })
          const users = usersStore.findByUserId(devise.get('owner'))
          if (users) {
            users.forEach(({ socketId }) => {
              io.to(socketId).emit(UPDATE_DEVISE, { uid, isOnline: false })
            })
          }
        }
        devisesStore.delete(socket.id)
      }
      const users = usersStore.findBySocketId(socket.id)
      if (users) {
        usersStore.delete(socket.id)
      }
    })
  })
}
