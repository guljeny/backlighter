import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import I18n from '$utils/I18n'

function NavMenu ({ authorized }) {
  return (
    <nav>
      <NavLink exact to="/"><I18n t="navigation.shop" /></NavLink>
      {authorized && (
        <NavLink to="/control-panel"><I18n t="navigation.cp" /></NavLink>
      )}
    </nav>
  )
}


const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(NavMenu)
