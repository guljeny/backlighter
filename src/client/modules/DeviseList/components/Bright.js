import React from 'react'
import api from '$api/devise'
import throttle from '$utils/throttle'

export default class Bright extends React.Component {
  sendToServer = throttle(bright => {
    const { uid } = this.props
    api.update(uid, { bright })
  }, 100)

  setBright = ({ target }) => {
    const bright = target.value
    this.sendToServer(bright)
  }

  render () {
    const { bright } = this.props
    return (
      <input type="range" min={1} max={255} step={1} value={bright} onChange={this.setBright} />
    )
  }
}
