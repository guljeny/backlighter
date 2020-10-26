const { ObjectId } = require('mongodb')
const User = require('$models/User')
const Device = require('$models/Device')
const notify = require('$utils/notify')
const { deviceList } = require('$sockets/actions')
const getLastFirmwareVersion = require('$utils/getLastFirmwareVersion')

module.exports = async function updateFirmware (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) return res.sendStatus.unauthorized()
  const { uid } = req.body
  const device = await Device.findBy({ uid })
  if (!device || !ObjectId(userId).equals(device.owner)) {
    return res.sendStatus.unprocessableEntity()
  }
  const data = { version: getLastFirmwareVersion() }
  await device.update(data)
  device.updateFirmware()
  notify.user(userId, deviceList.updateOne, { uid, ...data, isOnline: false })
  res.sendStatus.success()
}
