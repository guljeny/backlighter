import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import page from '$utils/page'
import NavMenu from '$components/NavMenu'
import User from './components/User'
import MenuButton from './components/MenuButton'
import LoginButtons from './components/LoginButtons'
import MainMenu from './components/MainMenu'
import logo from './images/logo.svg'

import './header.scss'

function Header ({ authorized }) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)
  const showControls = !page.isAddDevice()
  return (
    <header className="header">
      <div className="container">
        <MenuButton
          isOpen={isMainMenuOpen}
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
        />
        <MainMenu
          isOpen={isMainMenuOpen}
          handleClose={() => setIsMainMenuOpen(false)}
        />
        <Link className="header__logo" to="/">
          <img src={logo} alt="" />
        </Link>
        {showControls && (
          <>
            <NavMenu />
            {authorized ? <User /> : <LoginButtons />}
          </>
        )}
      </div>
    </header>
  )
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
})

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Header)
