const Device = require('$app/models/Device')
const notify = require('$utils/notify')
const { deviceStore } = require('../stores')
const { device: deviceActions, deviceList } = require('../actions')

module.exports = async ({ uid, version, deviceType }, socket) => {
  deviceStore.addItem({ uid, id: socket.id })
  let device = await Device.findBy({ uid })
  if (!device) device = await Device.create({ uid, version, deviceType })
  device.update({ version })
  device.notify()
  if (device.newOwner) notify.device(uid, deviceActions.verifyOwner)
  notify.user(device.owner, deviceList.updateOne, { uid, isOnline: true, version })
}
