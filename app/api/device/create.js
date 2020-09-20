const User = require('$models/User')
const Device = require('$models/Device')
const validateForm = require('$utils/validateForm')
const notify = require('$utils/notify')

module.exports = async function create (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) return res.sendStatus.unauthorized()
  const { uid, deviceName, deviceType } = req.body
  const errors = validateForm({ uid, deviceName })
  if (errors) return res.sendStatus.unprocessableEntity(errors)
  let device = await Device.findBy({ uid })
  if (!device) device = await Device.create({ uid })
  await device.update({ newOwner: userId, newName: deviceName, deviceType })
  notify.device(uid, device.verifyOwner)
  res.sendStatus.success()
}
