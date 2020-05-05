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

import './header.scss'

function Header ({ authorized }) {
  return (
    <header className="header">
      <div className="container">
        <Link className="header-title" to="/">Backlighter</Link>
        {authorized && (
          <nav>
            <NavLink exact to="/">Shop</NavLink>
            <NavLink to="/devises">My devises</NavLink>
          </nav>
        )}
        {!isAddDevisePage() && (
          <div className="header-buttons">
            {authorized ? (
              <Button modifiers="btn--outline" onClick={logout}><I18n t="buttons.logout" /></Button>
            ) : (
              <>
                <Button
                  modifiers="btn--primary"
                  onClick={() => showPopup('registration', RegistrationPopup)}
                >
                  <I18n t="buttons.register" />
                </Button>
                <Button
                  modifiers="btn--outline"
                  onClick={() => showPopup('register', LoginPopup)}
                >
                  <I18n t="buttons.login" />
                </Button>
              </>
            )}
          </div>
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