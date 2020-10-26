import React from 'react'
import classnames from 'classnames'
import colorsys from 'colorsys'
import selection from '$utils/selection'
import isTouch from '$utils/isTouch'
import scroll from '$utils/scroll'

export default class ColorBrightLine extends React.Component {
  state = {
    draggable: false,
  }

  startDrag = e => {
    e.preventDefault()
    const event = e.touches ? e.touches[0] : e
    this.lastPageY = event.pageY
    this.setState({ draggable: true })
    selection.disable()
    if (isTouch) {
      scroll.disable()
    } else {
      document.addEventListener('mouseup', this.endDrag)
      document.addEventListener('mousemove', this.mouseMove)
    }
  }

  mouseMove = e => {
    e.preventDefault()
    const event = e.touches ? e.touches[0] : e
    const { pageY } = event
    let saturation = this.props.saturation + (pageY - this.lastPageY) / 3
    if (saturation > 100) saturation = 100
    if (saturation <= 0) saturation = 0
    this.props.setSaturation(saturation)
    this.lastPageY = pageY
  }

  endDrag = () => {
    this.setState({ draggable: false })
    document.removeEventListener('mouseup', this.endDrag)
    document.removeEventListener('mousemove', this.mouseMove)
  }

  render () {
    const { draggable } = this.state
    const { angle, saturation } = this.props
    const { r, g, b } = colorsys.hsvToRgb(angle, 100, 100)
    return (
      <div
        style={{ background: `rgb(${r}, ${g}, ${b})` }}
        onMouseDown={this.startDrag}
        className={classnames(
          'color-picker__selected-color',
          angle >= 45 && angle <= 195 && 'color-picker__selected-color--inverse',
          draggable && 'color-picker__selected-color--open',
        )}
      >
        <div className="color-picker__selected-color-white-overlay" />
        <div
          className="color-picker__selected-color-saturation"
          top={saturation}
          background={colorsys.hsvToRgb(angle + 180, saturation, 100)}
          style={{
            top: `${2 + saturation / 100 * 88}%`,
            background: `rgb(${[...Array(3)].fill(saturation * 2.55).join(',')}) ${draggable ? '!important' : ''}`,
          }}
        />
      </div>
    )
  }
}
