const { MongoClient } = require('mongodb')
const config = require('$config')

const user = encodeURIComponent(config.db_user)
const password = encodeURIComponent(config.db_password)
const url = `mongodb://${user}:${password}@${config.db_url}/?authMechanism=DEFAULT`

const client = new MongoClient(url)

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
