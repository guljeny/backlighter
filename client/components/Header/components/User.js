import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import I18n from '$utils/I18n'
import logout from '$utils/logout'

function User ({ authorized, email }) {
  if (!authorized) return null
  return (
    <div className="header__user">
      <div className="header__user-email">
        {email}
      </div>
      <ul>
        <li>
          <I18n t="buttons.profile" />
        </li>
        <li onClick={logout}>
          <I18n t="buttons.logout" />
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
  email: user.email,
})

export default compose(
  connect(mapStateToProps),
  withRouter,
)(User)
