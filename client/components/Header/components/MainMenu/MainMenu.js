import React from 'react'
import classnames from 'classnames'
import NavMenu from '$components/NavMenu'

import './mainMenu.scss'

export default function MainMenu ({ isOpen, handleClose }) {
  return (
    <div
      className={classnames('main-menu', isOpen && 'main-menu--open')}
      onClick={handleClose}
    >
      <div className="main-menu__inner">
        <NavMenu />
      </div>
    </div>
  )
}
