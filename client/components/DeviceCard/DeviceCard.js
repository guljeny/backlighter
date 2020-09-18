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

  // disable = () => {
  //   const { uid } = this.props
  //   api.update(uid, { enabled: false })
  // }

  // enable = () => {
  //   const { uid } = this.props
  //   api.update(uid, { enabled: true })
  // }


  // update = () => {
  //   const { uid } = this.props
  //   api.updateFirmware(uid)
  // }

  render () {
    const { name, enabled, isOnline, bright, uid, colors } = this.props
    return (
      <div className={
        classnames(
          'device-card',
          !isOnline && 'device-card--offline',
        )
      }
      >
        <div className="device-card__header">
          <OnlineStatus isOnline />
          <div className="device-card__title">
            {name}
          </div>
          <div className="device-card__open">
            <img src={openIcon} alt="open" />
            <div className="device-card__open-warning">i</div>
          </div>
        </div>
        <div className="device-card__content">
          <ColorPicker colors={colors} onChange={this.setColors} />
          <div className="device-card__slider">
            <img src={brightIcon} alt="" />
            <Slider to={255} value={bright} onChange={this.setBright} />
          </div>
          <div className="device-card__slider">
            <img src={speedIcon} alt="" />
            <Slider from={-1} to={1} />
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
