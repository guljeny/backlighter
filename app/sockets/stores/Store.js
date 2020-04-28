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
    return this.state.find(item => item[key] === value)
  }
}

module.exports = Store
