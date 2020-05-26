const { ObjectId } = require('mongodb')
const User = require('$models/User')
const Devise = require('$models/Devise')
const response = require('$utils/response')
const notify = require('$utils/notify')
const { deviseList } = require('$sockets/actions')

const fieldsToNotify = ['enabled', 'bright', 'r', 'g', 'b']

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
  if (Object.keys(rest).some(key => fieldsToNotify.includes(key))) {
    devise.notify()
  }
  notify.user(userId, deviseList.updateOne, { uid, ...rest })
  response.success(res)
}
