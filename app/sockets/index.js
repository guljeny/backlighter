const io = require('$app/socketIO')
const Devise = require('$app/models/Devise')
const User = require('$app/models/User')
const { devisesStore, usersStore } = require('./stores')
const { VERIFY_OWNER, DEVISE_ENABLE, DEVISE_BRIGHT } = require('./actions')

module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on('DEVISE_CONNECTION', async ({ uid, version }) => {
      devisesStore.addItem({ uid, id: socket.id })
      let devise = await Devise.findBy({ uid })
      if (!devise) {
        devise = await Devise.add({ uid, version })
      }
      devise.update({ version, isOnline: true })
      socket.emit(DEVISE_ENABLE, devise.get('enabled'))
      socket.emit(DEVISE_BRIGHT, devise.get('bright'))
      if (devise.get('newOwner')) socket.emit('VERIFY_OWNER')
      const owner = devise.get('owner')
      if (!owner) return
      const users = usersStore.findByUserId(owner)
      if (users) {
        users.forEach(({ socketId }) => {
          io.to(socketId).emit('DEVISES:UPDATE', { uid, isOnline: true })
        })
      }
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
