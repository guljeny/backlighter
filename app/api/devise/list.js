const response = require('$utils/response')
const getLastFirmwareVersion = require('$utils/getLastFirmwareVersion')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')

module.exports = async function user (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const devises = await Devise.listForOwner(userId)
  const lastFirmwareVersion = await getLastFirmwareVersion()
  response.success(res, { list: devises, lastFirmwareVersion })
}
