const User = require('$app/models/User')
const Device = require('$app/models/Device')
const { deviceStore, usersStore } = require('../stores')
const notify = require('$utils/notify')
const { deviceList } = require('../actions')

module.exports = async (id, socket) => {
  const user = await User.findBy({ id })
  if (!user) return
  usersStore.addItem({ id, socketId: socket.id })
  // notify user if reconnect and have loaded list
  const list = await Device.listForOwner(id)
  const sendData = list.map(({ uid }) => ({ uid, isOnline: !!deviceStore.findByUid(uid) }))
  notify.user(id, deviceList.updateAll, sendData)
}
