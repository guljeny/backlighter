const md5 = require('js-md5')
const db = require('$db')

class User {
  static async findBy (req) {
    const user = await db.collection('users').findOne(req)
    return user && new User(user)
  }

  static async register ({ email, password, ...rest }) {
    const data = {
      email,
      ...rest,
      password: md5(password),
    }
    const { ops } = await db.collection('users').insertOne(data)
    return new User(ops[0])
  }

  constructor (user) {
    this.user = user
  }

  values () {
    const { email, _id } = this.user
    return {
      id: _id,
      email,
    }
  }
}

module.exports = User
