import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import classnames from 'classnames'
import I18n from '$utils/I18n'
import logout from '$utils/logout'

class User extends React.Component {
  state = {
    isOpen: false,
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClose)
  }

  handleOpen = () => {
    if (this.state.isOpen) return
    this.setState({ isOpen: true })
    document.addEventListener('click', this.handleClose)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    document.removeEventListener('click', this.handleClose)
  }

  render () {
    const { isOpen } = this.state
    const { authorized, email } = this.props
    if (!authorized) return null
    return (
      <div className={classnames('header__user', isOpen && 'header__user--open')}>
        <div className="header__user-email" onClick={this.handleOpen}>
          {email.replace(/@.*$/, '')}
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
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
  email: user.email,
})

export default compose(
  connect(mapStateToProps),
  withRouter,
)(User)
