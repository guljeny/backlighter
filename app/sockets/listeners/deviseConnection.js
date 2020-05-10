const notifyUsers = require('$utils/notifyUsers')
const Devise = require('$app/models/Devise')
const { devisesStore } = require('../stores')
const { common: { VERIFY_OWNER } } = require('../actions')

module.exports = async ({ uid, version, deviseType }, socket) => {
  devisesStore.addItem({ uid, id: socket.id })
  let devise = await Devise.findBy({ uid })
  if (!devise) devise = await Devise.add({ uid, version, deviseType })
  devise.update({ version })
  devise.notify()
  if (devise.get('newOwner')) socket.emit(VERIFY_OWNER)
  notifyUsers(devise.get('owner')).deviseUpdate(uid, { isOnline: true, version })
}
