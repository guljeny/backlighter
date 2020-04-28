const io = require('$app/socketIO')
const Devise = require('$app/models/Devise')
const { devisesStore } = require('./stores')

const devices = []
module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on('DEVISE_CONNECTION', async ({ uid, version }) => {
      devisesStore.addItem({ uid, id: socket.id })
      let devise = await Devise.findBy({ uid })
      if (!devise) {
        devise = await Devise.add({ uid, version })
      } else if (devise.getVersion() !== version) {
        devise.setVersion(version)
      }
      // TODO: send sockets with devise info to device
      if (devise.getNewOwner()) socket.emit('VERIFY_OWNER')
      // const owner = devise.getOwner()
      // if (!owner) return
      // TODO: notify owner about devise onlie
    })
    socket.on('VERIFY_OWNER', async () => {
      const uid = devisesStore.findBySocketId(socket.id)
      const devise = await Devise.findBy({ uid })
      devise.setIsVerified()
      // notify owner if online with new devise
    })
    socket.on('disconnect', () => {
      devices.filter(({ id }) => id !== socket.id)
    })
  })
}
