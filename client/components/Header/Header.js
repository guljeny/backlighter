import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import LoginPopup from '$components/popups/LoginPopup'
import RegistrationPopup from '$components/popups/RegistrationPopup'
import { Button } from '$components/form'
import showPopup from '$utils/showPopup'
import { isAddDevisePage } from '$utils/page'
import I18n from '$utils/I18n'
import logout from '$utils/logout'
import logo from './images/logo.svg'

import './header.scss'

function Header ({ authorized, email }) {
  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" to="/"><img src={logo} alt="logo" /></Link>
        {authorized && (
          <nav>
            <NavLink exact to="/">Shop</NavLink>
            <NavLink to="/devises">My devises</NavLink>
          </nav>
        )}
        {!isAddDevisePage() && (
          <>
            {authorized ? (
              <div className="header__user">
                <div className="header__user-email">
                  {email}
                </div>
                <ul>
                  <li onClick={logout}>
                    <I18n t="buttons.logout" />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="header__buttons">
                <Button
                  modifiers="btn--as-link"
                  onClick={() => showPopup('registration', RegistrationPopup)}
                >
                  <I18n t="buttons.register" />
                </Button>
                <Button
                  modifiers="header__login-button"
                  onClick={() => showPopup('login', LoginPopup)}
                >
                  <I18n t="buttons.login" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
  email: user.email,
})

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Header)
