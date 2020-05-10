const Devise = require('$app/models/Devise')
const notifyUsers = require('$utils/notifyUsers')
const { devisesStore } = require('../stores')

module.exports = async socket => {
  const uid = devisesStore.findBySocketId(socket.id)
  if (!uid) return
  const devise = await Devise.findBy({ uid })
  await devise.setIsVerified()
  notifyUsers(devise.get('owner')).availableDevise(uid, devise.get())
}
