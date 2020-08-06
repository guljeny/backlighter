import React from 'react'
import classnames from 'classnames'
import colorsys from 'colorsys'
import angleBetween from '$utils/angleBetween'
import selection from '$utils/selection'
import powerIcon from '$images/power.svg'

import './colorPicker.scss'

export default class SelectWheel extends React.PureComponent {
  state = {
    angle: this.props.angle,
    scrollNow: false,
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps ({ angle }) {
    if (angle === this.props.angle) return
    this.setState({ angle })
  }

  startScroll = e => {
    const { pageX, pageY, target } = e
    const { top, left, width, height } = target.getBoundingClientRect()
    this.centerX = left + window.scrollX + width / 2
    this.centerY = top + window.scrollY + height / 2
    this.startPointerPosition = { x: pageX, y: pageY }
    this.startAngle = angleBetween(pageY - this.centerY, pageX - this.centerX)
    this._angle = this.state.angle
    this._mouseMoved = false
    this.setState({ scrollNow: true })
    selection.disable()
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  }

  mouseUp = () => {
    this.setState({ scrollNow: false })
    selection.enable()
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
    if (!this._mouseMoved) {
      let angle = (this._angle - this.startAngle + 90) % 360
      if (angle < 0) angle = 360 + angle
      this.setState({ angle })
      this.props.setColor(angle)
    }
  }

  mouseMove = e => {
    const { pageX, pageY } = e
    if (Math.sqrt(
      Math.abs(pageX - this.startPointerPosition.x) ** 2
      + Math.abs(pageY - this.startPointerPosition.y) ** 2,
    ) > 1) {
      this._mouseMoved = true
    }
    if (this._mouseMoved) {
      let angle = angleBetween(pageY - this.centerY, pageX - this.centerX) - this.startAngle
      if (angle < 0) angle = 360 + angle
      angle = (this._angle + angle) % 360
      this.setState({ angle })
      this.props.setColor(angle)
    }
  }

  render () {
    const { angle, scrollNow } = this.state
    const { r, g, b } = colorsys.hsvToRgb(angle, 100, 100)
    return (
      <div className="color-picker__selector-container">
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className={classnames(
            'color-picker__selector',
            !scrollNow && 'color-picker__selector--with-animation',
          )}
          onMouseDown={this.startScroll}
        />
        <div className="color-picker__power-button-container">
          <div className="color-picker__power-button">
            <img src={powerIcon} alt="power" />
          </div>
        </div>
        <div
          style={{ background: `rgb(${r}, ${g}, ${b})` }}
          className={classnames(
            'color-picker__selected-color',
            angle >= 45 && angle <= 195 && 'color-picker__selected-color--inverse',
          )}
        />
      </div>
    )
  }
}
