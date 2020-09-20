import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loadDeviceList } from '$actions/device'
import DeviceCard from '$components/DeviceCard'
import Loader from '$components/Loader'

import './deviceList.scss'


class DeviceList extends React.Component {
  componentDidMount () {
    this.props.loadDeviceList()
  }

  render () {
    const { authorized, items, loading } = this.props
    if (!authorized) return <Redirect to="/" />
    if (loading) return <div className="fullscreen-loader"><Loader /></div>
    return (
      <div className="device-list">
        {items.map(item => <DeviceCard key={item.uid} {...item} />)}
        {/* <DeviceCard name="Lamp in kitchen" /> */}
        {/* <DeviceCard /> */}
        {/* <DeviceCard /> */}
        {/* <DeviceCard /> */}
        {/* <DeviceCard /> */}
        {/* <DeviceCard /> */}
        {/* <DeviceCard /> */}
      </div>
    )
  }
}

const mapStateToProps = ({ user, device }) => ({
  authorized: user.authorized,
  items: device.items,
  loading: device.loading,
})

export default connect(mapStateToProps, { loadDeviceList })(DeviceList)
