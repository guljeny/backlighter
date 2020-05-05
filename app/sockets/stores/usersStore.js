const { ObjectId } = require('mongodb')
const Store = require('./Store')

class UsersStore extends Store {
  findByUserId (userId) {
    return this.findByKey('id', ObjectId(userId).toString())
  }

  findBySocketId (id) {
    return this.findByKey('socketId', id)
  }

  delete (socketId) {
    this.deleteByKey('socketId', socketId)
  }
}

module.exports = new UsersStore()
