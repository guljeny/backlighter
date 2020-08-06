const Device = require('$app/models/Device')
const notify = require('$utils/notify')
const { deviceStore } = require('../stores')
const { device: deviceActions, deviceList } = require('../actions')

module.exports = async ({ uid, version, deviceType }, socket) => {
  console.log('connection', uid, version)
  deviceStore.addItem({ uid, id: socket.id })
  let device = await Device.findBy({ uid })
  if (!device) device = await Device.add({ uid, version, deviceType })
  device.update({ version })
  device.notify()
  if (device.get('newOwner')) notify.device(uid, deviceActions.verifyOwner)
  notify.user(device.get('owner'), deviceList.updateOne, { uid, isOnline: true, version })
}
