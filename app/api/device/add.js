const User = require('$models/User')
const Device = require('$models/Device')
const validateForm = require('$utils/validateForm')
const notify = require('$utils/notify')
const { device } = require('$sockets/actions')

module.exports = async function add (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    res.sendStatus.unauthorized()
    return
  }
  const { uid, deviceName, deviseType } = req.body
  const errors = validateForm({ uid, deviceName })
  if (errors) {
    res.sendStatus.unprocessableEntity(errors)
    return
  }
  let device = await Device.findBy({ uid })
  if (!device) device = await Device.add({ uid })
  await device.update({ newOwner: userId, newName: deviceName, deviseType })
  notify.device(uid, device.verifyOwner)
  res.sendStatus.success()
}
