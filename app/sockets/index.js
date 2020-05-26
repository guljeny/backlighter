const io = require('$app/socketIO')
const Devise = require('$models/Devise')
const notify = require('$utils/notify')
const { deviseStore, usersStore } = require('./stores')
const { devise, user, deviseList } = require('./actions')
const { deviseConnection, verifyOwner, userConnection } = require('./listeners')

module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on(devise.connect, data => deviseConnection(data, socket))
    socket.on(devise.verifyMe, () => verifyOwner(socket))
    socket.on(user.connect, id => userConnection(id, socket))
    socket.on('disconnect', async () => {
      const uid = deviseStore.findBySocketId(socket.id)
      if (uid) {
        const deviseSockets = deviseStore.findByUid(uid)
        // when devise reconnect, old socket delete after some time
        // and disconnect trigger when socket stay one
        if (deviseSockets && deviseSockets.all.length === 1) {
          const devise = await Devise.findBy({ uid })
          if (devise) {
            notify.user(devise.get('owner'), deviseList.updateOne, { uid, isOnline: false })
          }
        }
        deviseStore.delete(socket.id)
      }
      const users = usersStore.findBySocketId(socket.id)
      if (users) {
        usersStore.delete(socket.id)
      }
    })
  })
}
