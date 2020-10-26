const User = require('$models/User')
const Device = require('$models/Device')
const getLastFirmwareVersion = require('$utils/getLastFirmwareVersion')

module.exports = async function user (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) return res.sendStatus.unauthorized()
  const devices = await Device.listForOwner(userId)
  const lastFirmwareVersion = await getLastFirmwareVersion()
  res.sendStatus.success({ items: devices, lastFirmwareVersion })
}
