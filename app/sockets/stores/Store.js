class Store {
  constructor () {
    this.state = []
  }

  addItem (item) {
    this.state.push(item)
  }

  deleteByKey (key, value) {
    this.state = this.state.filter(item => item[key] !== value)
  }

  findByKey (key, value) {
    const items = this.state.filter(item => item[key] === value)
    if (!items.length) return null
    return items
  }
}

module.exports = Store
