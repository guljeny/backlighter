const { ObjectId } = require('mongodb')
const User = require('$models/User')
const Devise = require('$models/Devise')
const response = require('$utils/response')
const notify = require('$utils/notify')
const { deviseList } = require('$sockets/actions')
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
  notify.user(userId, deviseList.updateOne, { uid, ...data, isOnline: false })
  response.success(res)
}
