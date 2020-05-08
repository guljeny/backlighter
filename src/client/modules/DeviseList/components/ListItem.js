import React from 'react'
import classnames from 'classnames'
import { HuePicker } from 'react-color'
import PowerButton from './PowerButton'
import Bright from './Bright'
import api from '$api/devise'
import throttle from '$utils/throttle'

export default class ListItem extends React.Component {
  state = {
    r: this.props.r,
    g: this.props.g,
    b: this.props.b,
  }

  updateColor = throttle(({ r, g, b }) => {
    const { uid } = this.props
    api.update(uid, { r, g, b })
  }, 100)

  disable = () => {
    const { uid } = this.props
    api.update(uid, { enabled: false })
  }

  enable = () => {
    const { uid } = this.props
    api.update(uid, { enabled: true })
  }

  update = () => {
    const { uid } = this.props
    api.updateFirmware(uid)
  }

  handleColorChange = ({ rgb }) => {
    this.setState({ ...rgb })
    this.updateColor(rgb)
  }

  render () {
    const { name, enabled, isOnline, bright, uid } = this.props
    const { r, g, b } = this.state
    return (
      <div className={
        classnames(
          'devise-list__item-wrapper',
          !isOnline && 'devise-list__item-wrapper--offline',
        )
      }
      >
        {!isOnline && (
          <div className="devise-list__offline">
            Offline
          </div>
        )}
        <div className="devise-list__item">
          <PowerButton
            enabled={enabled}
            onClick={enabled ? this.disable : this.enable}
          />
          <div className="devise-list__item-content">
            {name}
            <Bright bright={bright} uid={uid} />
            <button onClick={this.update}>update</button>
            <HuePicker color={{ r, g, b }} onChange={this.handleColorChange} />
          </div>
        </div>
      </div>
    )
  }
}
