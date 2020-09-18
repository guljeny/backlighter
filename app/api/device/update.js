const { ObjectId } = require('mongodb')
const User = require('$models/User')
const Device = require('$models/Device')
const notify = require('$utils/notify')
const { deviceList } = require('$sockets/actions')

const fieldsToNotify = ['enabled', 'bright', 'colors']

module.exports = async function update (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    res.sendStatus.unauthorized()
    return
  }
  const { uid, clientUid, ...rest } = req.body
  const device = await Device.findBy({ uid })
  if (!device || !ObjectId(userId).equals(device.get('owner'))) {
    res.sendStatus.unprocessableEntity()
    return
  }
  await device.update(rest)
  if (Object.keys(rest).some(key => fieldsToNotify.includes(key))) {
    device.notify()
  }
  notify.user(userId, deviceList.updateOne, { uid, ...rest, clientUid })
  res.sendStatus.success()
}
