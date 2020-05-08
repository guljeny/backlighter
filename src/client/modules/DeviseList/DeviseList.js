import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loadDevises } from '$actions/devises'
import ListItem from './components/ListItem'

import './deviseList.scss'

class DeviseList extends React.Component {
  componentDidMount () {
    this.props.loadDevises()
  }

  render () {
    const { authorized, list } = this.props
    if (!authorized) return <Redirect to="/" />
    return (
      <div className="container devise-list">
        <div className="devise-list__wrapper">
          {list.map(item => <ListItem key={item.uid} {...item} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, devises }) => ({
  authorized: user.authorized,
  list: devises.list,
})

export default connect(mapStateToProps, { loadDevises })(DeviseList)
