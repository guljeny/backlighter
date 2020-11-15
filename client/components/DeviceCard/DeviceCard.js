import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import api from '$api/device'
import throttle from '$utils/throttle'
import ColorPicker from '$components/ColorPicker'
import Slider from '$components/Slider'
import OnlineStatus from '$components/OnlineStatus'
import brightIcon from '$images/bright.svg'
import speedIcon from '$images/speed.svg'
import { updateDevice } from '$actions/device'

import openIcon from '$images/arrow.svg'

import './deviceCard.scss'

class DeviceCard extends React.Component {
  sendData = throttle((uid, data) => {
    api.update(uid, data)
  }, 100)

  setColors = colors => {
    const { uid, updateDevice } = this.props
    updateDevice({ uid, colors })
    this.sendData(uid, { colors })
  }

  setBright = _bright => {
    const { uid, updateDevice } = this.props
    const bright = Math.round(_bright)
    updateDevice({ uid, bright })
    this.sendData(uid, { bright })
  }

  setSpeed = _speed => {
    const { uid, updateDevice } = this.props
    const speed = Math.round(_speed)
    updateDevice({ uid, speed })
    this.sendData(uid, { speed })
  }

  togglePower = () => {
    const { uid, enabled: _enabled, updateDevice } = this.props
    const enabled = !_enabled
    api.update(uid, { enabled })
    updateDevice({ uid, enabled })
  }

  render () {
    const { name, enabled, isOnline, bright, speed, colors } = this.props
    const isBlocked = !isOnline || !enabled
    return (
      <div className={
        classnames(
          'device-card',
          !isOnline && 'device-card--offline',
          isBlocked && 'device-card--disabled',
        )
      }
      >
        <div className="device-card__header">
          <OnlineStatus isOnline={isOnline} />
          <div className="device-card__title">
            {name}
          </div>
          <div className="device-card__open">
            <img src={openIcon} alt="open" />
            <div className="device-card__open-warning">i</div>
          </div>
        </div>
        <div className="device-card__content">
          <ColorPicker
            colors={colors}
            onChange={this.setColors}
            powerEnabled={enabled}
            togglePower={this.togglePower}
            disabled={isBlocked}
          />
          <div className="device-card__slider">
            <img src={brightIcon} alt="" />
            <Slider disabled={isBlocked} to={100} value={bright} onChange={this.setBright} />
          </div>
          <div className="device-card__slider">
            <img src={speedIcon} alt="" />
            <Slider disabled={isBlocked} value={speed} from={300} to={5000} onChange={this.setSpeed} />
          </div>
          {/* <button onClick={this.update}>update</button> */}
        </div>
        {/* <Bright bright={bright} uid={uid} /> */}
        {/* <PowerButton */}
        {/*   enabled={enabled} */}
        {/*   onClick={enabled ? this.disable : this.enable} */}
        {/* /> */}
        {/* <HuePicker color={{ r, g, b }} onChange={this.updateColor} /> */}
      </div>
    )
  }
}

export default connect(null, { updateDevice })(DeviceCard)
