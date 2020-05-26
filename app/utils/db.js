const { MongoClient } = require('mongodb')
const { mongoConnectionUrl } = require('$config')

const client = new MongoClient(mongoConnectionUrl)

class Db {
  constructor () {
    this.db = null
  }

  connect () {
    return new Promise((resolve, reject) => {
      client.connect(err => {
        if (err) reject(err)
        this.db = client.db('main')
        resolve()
      })
    })
  }

  collection (collection) {
    if (!this.db) throw new Error('Connect to mongodb first')
    return this.db.collection(collection)
  }
}

module.exports = new Db()
