import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { isAddDevisePage } from '$utils/page'
import NavMenu from './components/NavMenu'
import User from './components/User'
import LoginButtons from './components/LoginButtons'
import logo from './images/logo.svg'

import './header.scss'

function Header ({ authorized }) {
  const showControls = !isAddDevisePage()
  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" to="/"><img src={logo} alt="logo" /></Link>
        {showControls && (
          <>
            {authorized ? (
              <>
                <NavMenu />
                <User />
              </>
            ) : (
              <LoginButtons />
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
