const { ObjectId } = require('mongodb')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const response = require('$utils/response')
const notifyUsers = require('$utils/notifyUsers')
const getLastFirmwareVersion = require('$utils/getLastFirmwareVersion')

module.exports = async function updateFirmware (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const { uid } = req.body
  const devise = await Devise.findBy({ uid })
  if (!devise || !ObjectId(userId).equals(devise.get('owner'))) {
    response.unprocessableEntity(res)
    return
  }
  const data = { version: getLastFirmwareVersion() }
  await devise.update(data)
  devise.updateFirmware()
  notifyUsers(userId).deviseUpdate(uid, { ...data, isOnline: false })
  response.success(res)
}
