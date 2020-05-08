const { ObjectId } = require('mongodb')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const response = require('$utils/response')
const notifyUsers = require('$utils/notifyUsers')

const fieldsToNotify = ['enabled', 'bright', 'R', 'G', 'B']

module.exports = async function update (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const { uid, ...rest } = req.body
  const devise = await Devise.findBy({ uid })
  if (!devise || !ObjectId(userId).equals(devise.get('owner'))) {
    response.unprocessableEntity(res)
    return
  }
  await devise.update(rest)
  if (Object.keys(rest).find(key => fieldsToNotify.includes(key))) {
    devise.notify()
  }
  notifyUsers(userId).deviseUpdate(uid, rest)
  response.success(res)
}
