import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loadDeviseList } from '$actions/deviseList'
import ListItem from './components/ListItem'

import './deviseList.scss'

class DeviseList extends React.Component {
  componentDidMount () {
    this.props.loadDeviseList()
  }

  render () {
    const { authorized, items } = this.props
    if (!authorized) return <Redirect to="/" />
    return (
      <div className="container devise-list">
        <div className="devise-list__wrapper">
          {items.map(item => <ListItem key={item.uid} {...item} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, deviseList }) => ({
  authorized: user.authorized,
  items: deviseList.items,
})

export default connect(mapStateToProps, { loadDeviseList })(DeviseList)
