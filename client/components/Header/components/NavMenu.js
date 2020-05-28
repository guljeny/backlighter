import React from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

function NavMenu () {
  return (
    <nav>
      <NavLink exact to="/">Shop</NavLink>
      <NavLink to="/devises">My devises</NavLink>
    </nav>
  )
}

export default withRouter(NavMenu)
