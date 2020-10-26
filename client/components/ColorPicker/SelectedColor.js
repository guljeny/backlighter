import React from 'react'
import classnames from 'classnames'
import Trash from '$images/inline/Trash'

export default class SelectedColor extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount () {
    setTimeout(() => this.setState({ isVisible: true }), 20)
  }

  render () {
    const { isVisible } = this.state
    const { color: { r, g, b }, onSelect, onRemove, isActive, showTrash } = this.props
    return (
      <div
        className={classnames(
          'color-picker__color',
          isActive && 'color-picker__color--active',
          isVisible && 'color-picker__color--visible',
        )}
      >
        <div
          onClick={onSelect}
          style={{ background: `rgb(${r},${g},${b})` }}
          className="color-picker__color-dot"
        />
        <div
          className={classnames(
            'color-picker__color-inner',
            showTrash && 'color-picker__color-inner--with-trash',
          )}
        >
          {showTrash && (
            <span onClick={onRemove}>
              <Trash />
            </span>
          )}
        </div>
      </div>
    )
  }
}
