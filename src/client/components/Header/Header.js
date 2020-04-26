import React from 'react'
import { connect } from 'react-redux'
import LoginPopup from '$components/popups/LoginPopup'
import RegisterPopup from '$components/popups/RegisterPopup'
import { Button } from '$components/form'
import showPopup from '$utils/showPopup'
import I18n from '$utils/I18n'
import logout from '$utils/logout'

import './header.scss'

function Header ({ authorized }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">Backlighter</div>
        <div className="header-buttons">
          {authorized ? (
            <Button modifiers="as-link" onClick={logout}><I18n t="buttons.logout" /></Button>
          ) : (
            <>
              <Button onClick={() => showPopup(RegisterPopup)}>
                <I18n t="buttons.register" />
              </Button>
              <Button
                modifiers="bordered"
                onClick={() => showPopup(LoginPopup)}
              >
                <I18n t="buttons.login" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
})

export default connect(mapStateToProps)(Header)
