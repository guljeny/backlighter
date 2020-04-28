const Store = require('./Store')

class DevisesStore extends Store {
  findBySocketId (socketId) {
    const ids = this.findByKey('id', socketId)
    if (!ids) return null
    return ids.uid
  }

  findByUid (uid) {
    const ids = this.findByKey('uid', uid)
    if (!ids) return null
    return ids.id
  }
}

module.exports = new DevisesStore()
