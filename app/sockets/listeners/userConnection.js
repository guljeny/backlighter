const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { deviseStore, usersStore } = require('../stores')
const notify = require('$utils/notify')
const { deviseList } = require('../actions')

module.exports = async (id, socket) => {
  console.log('id', id)
  const user = await User.findBy({ id })
  if (!user) return
  usersStore.addItem({ id, socketId: socket.id })
  // notify user if reconnect and have loaded list
  const list = await Devise.listForOwner(id)
  const sendData = list.map(({ uid }) => ({ uid, isOnline: !!deviseStore.findByUid(uid) }))
  notify.user(id, deviseList.updateAll, sendData)
}
