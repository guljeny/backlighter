const Device = require('$app/models/Device')
const notify = require('$utils/notify')
const { deviceStore } = require('../stores')
const { deviceList } = require('../actions')

module.exports = async socket => {
  const uid = deviceStore.findBySocketId(socket.id)
  if (!uid) return
  const device = await Device.findBy({ uid })
  await device.setIsVerified()
  notify.user(device.get('owner'), deviceList.updateOne, device.get())
}
