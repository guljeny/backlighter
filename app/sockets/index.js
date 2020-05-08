const io = require('$app/socketIO')
const Devise = require('$app/models/Devise')
const User = require('$app/models/User')
const notifyUsers = require('$utils/notifyUsers')
const { devisesStore, usersStore } = require('./stores')
const { common: { VERIFY_OWNER } } = require('./actions')

module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on('DEVISE_CONNECTION', async ({ uid, version, deviseType }) => {
      devisesStore.addItem({ uid, id: socket.id })
      let devise = await Devise.findBy({ uid })
      if (!devise) devise = await Devise.add({ uid, version, deviseType })
      devise.update({ version, isOnline: true })
      devise.notify()
      if (devise.get('newOwner')) socket.emit(VERIFY_OWNER)
      const owner = devise.get('owner')
      if (!owner) return
      notifyUsers(owner).deviseUpdate(uid, { isOnline: true, version })
    })
    socket.on(VERIFY_OWNER, async () => {
      const uid = devisesStore.findBySocketId(socket.id)
      if (!uid) return
      const devise = await Devise.findBy({ uid })
      devise.setIsVerified()
      // notify owner if online with new devise
    })
    socket.on('USER_CONNECTION', async id => {
      const user = await User.findBy({ id })
      if (!user) return
      usersStore.addItem({ id, socketId: socket.id })
    })
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
              io.to(socketId).emit('DEVISES:UPDATE', { uid, isOnline: false })
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
