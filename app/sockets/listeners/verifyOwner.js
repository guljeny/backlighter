const Devise = require('$app/models/Devise')
const notify = require('$utils/notify')
const { deviseStore } = require('../stores')
const { deviseList } = require('../actions')

module.exports = async socket => {
  const uid = deviseStore.findBySocketId(socket.id)
  if (!uid) return
  const devise = await Devise.findBy({ uid })
  await devise.setIsVerified()
  notify.user(devise.get('owner'), deviseList.updateOne, devise.get())
}
