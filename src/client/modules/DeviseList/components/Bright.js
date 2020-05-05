import React from 'react'
import api from '../api'
import throttle from '$utils/throttle'

export default class Bright extends React.Component {
  state = {
    bright: this.props.bright,
  }

  sendToServer = throttle(bright => {
    const { uid } = this.props
    api.setBright(uid, bright)
  }, 500)

  setBright = ({ target }) => {
    const bright = target.value
    this.setState({ bright })
    this.sendToServer(bright)
  }

  render () {
    const { bright } = this.state
    return (
      <input type="range" min={1} max={255} step={1} value={bright} onChange={this.setBright} />
    )
  }
}
