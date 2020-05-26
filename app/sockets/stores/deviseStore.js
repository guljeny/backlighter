const Store = require('./Store')

class DevisesStore extends Store {
  findBySocketId (socketId) {
    const ids = this.findByKey('id', socketId)
    if (!ids) return null
    return ids[0].uid
  }

  findByUid (uid) {
    const ids = this.findByKey('uid', uid)
    if (!ids) return null
    return { all: ids, last: ids[ids.length - 1].id }
  }

  delete (socketId) {
    this.deleteByKey('id', socketId)
  }
}

module.exports = new DevisesStore()
