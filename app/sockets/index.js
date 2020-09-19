const io = require('$app/socketIO')
const Device = require('$models/Device')
const notify = require('$utils/notify')
const { deviceStore, usersStore } = require('./stores')
const { device, user, deviceList } = require('./actions')
const { deviceConnection, verifyOwner, userConnection } = require('./listeners')

module.exports = function bootstrapSockets () {
  io.on('connection', socket => {
    socket.on(device.connect, data => deviceConnection(data, socket))
    socket.on(device.verifyMe, () => verifyOwner(socket))
    socket.on(user.connect, id => userConnection(id, socket))
    socket.on('disconnect', async () => {
      const uid = deviceStore.findBySocketId(socket.id)
      if (uid) {
        const deviceSockets = deviceStore.findByUid(uid)
        // when device reconnect, disconnect may be called
        // after called connect socket
        // disconnect trigger when socket stay one
        if (deviceSockets && deviceSockets.all.length === 1) {
          const device = await Device.findBy({ uid })
          if (device) {
            notify.user(device.get('owner'), deviceList.updateOne, { uid, isOnline: false })
          }
        }
        deviceStore.delete(socket.id)
      }
      const users = usersStore.findBySocketId(socket.id)
      if (users) {
        usersStore.delete(socket.id)
      }
    })
  })
}
