import React, { createRef } from 'react'

const width = 305
const distance = 20
const circleWidth = 42
const animationTime = 150

export default class PathToColor extends React.PureComponent {
  canvas = createRef()

  componentDidMount () {
    this.ctx = this.canvas.current.getContext('2d')
    this.center = width / 2
    this.matchPoint()
    this.drawLine()
  }

  componentDidUpdate () {
    this.matchPoint()
    this.makeAnimationFrame()
  }

  makeAnimationFrame () {
    const targetTime = Date.now() + this.speed
    const makeFrame = () => {
      const currentTime = Date.now()
      const timeDiff = 1 - (targetTime - currentTime) / this.speed
      if (timeDiff > 1) {
        this.drawLine(1)
        return
      }
      this.drawLine(timeDiff)
      requestAnimationFrame(makeFrame)
    }
    requestAnimationFrame(makeFrame)
  }

  matchPoint () {
    const { count, selectedColor } = this.props
    const itemsWidth = circleWidth * (count + (count < 5 ? 1 : 0))
      + distance * (count - (count < 5 ? 0 : 1))
    const leftPoint = this.center - itemsWidth / 2
    this.previousPoint = this.nextPoint || 0
    this.nextPoint = leftPoint
      + circleWidth * (selectedColor + 1)
      + distance * selectedColor
      - circleWidth / 2
    this.speed = animationTime
      + Math.abs(this.previousPoint - this.nextPoint) / (circleWidth + distance) * 30
  }

  drawLine (progress = 1) {
    const xPoint = this.previousPoint
      + Math.abs(this.previousPoint - this.nextPoint)
      * progress
      * (this.previousPoint < this.nextPoint ? 1 : -1)
    const yOffset = (16 - 64 * (progress - 0.5) ** 2)
    this.ctx.clearRect(0, 0, width, 30)
    this.ctx.beginPath()
    this.ctx.moveTo(this.center, 0)
    this.ctx.arcTo(this.center, 14, xPoint, 22 - yOffset, 4)
    this.ctx.arcTo(xPoint, 22 - yOffset, xPoint, 30 - yOffset, 4)
    this.ctx.lineTo(xPoint, 30 - yOffset)
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = '#fff'
    this.ctx.stroke()
  }

  render () {
    return (
      <canvas ref={this.canvas} width={width} height="30" />
    )
  }
}
