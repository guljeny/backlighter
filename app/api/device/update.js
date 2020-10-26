const { ObjectId } = require('mongodb')
const User = require('$models/User')
const Device = require('$models/Device')
const notify = require('$utils/notify')
const { deviceList } = require('$sockets/actions')

const fieldsToNotify = ['enabled', 'bright', 'colors']
const fields = ['enabled', 'bright', 'colors']

module.exports = async function update (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) return res.sendStatus.unauthorized()
  const { uid, clientUid, ...rest } = req.body
  const device = await Device.findBy({ uid })
  if (!device || !ObjectId(userId).equals(device.owner)) {
    return res.sendStatus.unprocessableEntity()
  }
  const values = Object.entries(rest).reduce((acc, [key, value]) => {
    if (!fields.includes(key)) return acc
    return { ...acc, [key]: value }
  }, {})
  await device.update(values)
  if (Object.keys(req.body).some(key => fieldsToNotify.includes(key))) device.notify()
  notify.user(userId, deviceList.updateOne, { uid, ...values, clientUid })
  res.sendStatus.success()
}
