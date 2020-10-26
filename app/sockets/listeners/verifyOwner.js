const Device = require('$app/models/Device')
const notify = require('$utils/notify')
const { deviceStore } = require('../stores')
const { deviceList } = require('../actions')

module.exports = async socket => {
  const uid = deviceStore.findBySocketId(socket.id)
  if (!uid) return
  const device = await Device.findBy({ uid })
  const { newOwner, newName } = this.device
  await this.update({
    verified: true,
    owner: newOwner,
    name: newName,
    newOwner: null,
    newName: null,
  })
  notify.user(device.owner, deviceList.updateOne, device.restValues())
}
