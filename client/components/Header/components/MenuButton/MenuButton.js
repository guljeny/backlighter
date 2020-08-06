import React from 'react'
import classnames from 'classnames'

import './menuButton.scss'

export default function MenuButton ({ onClick, isOpen }) {
  return (
    <div
      className={classnames('menu-button', isOpen && 'menu-button--is-open')}
      onClick={onClick}
    >
      <div className="menu-button__center-line" />
    </div>
  )
}
