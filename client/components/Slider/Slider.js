import React from 'react'
import classnames from 'classnames'
import selection from '$utils/selection'
import isMobile from '$utils/isMobile'

import './slider.scss'

export default class Slider extends React.Component {
  state = {
    percent: (this.props.value - this.props.from) / (this.props.to - this.props.from),
  }

  circleRef = React.createRef()

  containerRef = React.createRef()

  componentDidMount () {
    const { percent } = this.state
    this.circleRef.current.style.left = `${percent * 100}%`
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (props) {
    const percent = (props.value - props.from) / (props.to - props.from)
    this.setState({ percent })
    this.circleRef.current.style.left = `${percent * 100}%`
  }

  handleClick = e => {
    const { left, width } = this.containerRef.current.getBoundingClientRect()
    this.leftPoint = left
    this.width = width
    this.setToMousePosition(e)
  }

  startDrag = e => {
    e.stopPropagation()
    selection.disable()
    if (isMobile) {
      document.addEventListener('touchmove', this.setToMousePosition, { passive: false })
      document.addEventListener('touchend', this.onMouseUp)
    } else {
      document.addEventListener('mousemove', this.setToMousePosition)
      document.addEventListener('mouseup', this.onMouseUp)
    }
    const { left, width } = this.containerRef.current.getBoundingClientRect()
    this.leftPoint = left
    this.width = width
  }

  setToMousePosition = e => {
    e.preventDefault()
    const event = e.touches ? e.touches[0] : e
    let percent = (event.clientX - this.leftPoint) / this.width
    if (percent > 1) percent = 1
    if (percent < 0) percent = 0
    const { lines, bigLines, magnetic, onChange, from, to } = this.props
    const magneticPoints = bigLines.map(line => line / (lines - 1))
    magneticPoints.forEach(point => {
      if (percent < point + magnetic && percent > point - magnetic) {
        percent = point
      }
    })
    this.circleRef.current.style.left = `${percent * 100}%`
    this.setState({ percent })
    onChange && onChange(percent * (to - from))
  }

  onMouseUp = () => {
    document.removeEventListener('touchmove', this.setToMousePosition)
    document.removeEventListener('mousemove', this.setToMousePosition)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchend', this.onMouseUp)
    selection.enable()
  }

  render () {
    const { percent } = this.state
    const { lines, bigLines } = this.props
    const linesArray = [...new Array(lines)]
    return (
      <div onClick={this.handleClick} className="slider" ref={this.containerRef}>
        <div
          className="slider__circle"
          onMouseDown={this.startDrag}
          onTouchStart={this.startDrag}
          ref={this.circleRef}
        />
        {linesArray.map((e, i) => (
          <div
            className={classnames(
              'slider__line',
              bigLines.includes(i) && 'slider__line--big',
              (1 / (lines - 1)) * i <= percent && 'slider__line--active',
            )}
            key={i}
          />
        ))}
      </div>
    )
  }
}

Slider.defaultProps = {
  lines: 21,
  bigLines: [0, 10, 20],
  magnetic: 0.04,
  value: 0.5,
  from: 0,
  to: 1,
}
