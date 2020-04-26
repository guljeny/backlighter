const { ObjectID } = require('mongodb')
const md5 = require('js-md5')
const db = require('$db')

module.exports = class User {
  static async findBy (req) {
    if (req.password) req.password = md5(req.password)
    if (req.hasOwnProperty('id')) {
      // eslint-disable-next-line no-underscore-dangle
      req._id = req.id && ObjectID(req.id)
      delete req.id
    }
    const user = await db.collection('users').findOne(req)
    return user && new User(user)
  }

  static async register ({ password, ...rest }) {
    const data = {
      ...rest,
      password: md5(password),
    }
    const { ops } = await db.collection('users').insertOne(data)
    return new User(ops[0])
  }

  constructor (user) {
    if (!user) throw new Error('no user provided in User.constructor')
    this.user = user
  }

  values () {
    const { email, _id } = this.user
    return {
      id: _id,
      email,
      authorized: true,
    }
  }
}
