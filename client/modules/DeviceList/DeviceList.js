import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loadDeviceList } from '$actions/device'
import DeviceCard from '$components/DeviceCard'

import './deviceList.scss'


class DeviceList extends React.Component {
  deviceListRef = React.createRef()

  componentDidMount () {
    this.props.loadDeviceList()
  }

  render () {
    const { authorized, items } = this.props
    if (!authorized) return <Redirect to="/" />
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
})

export default connect(mapStateToProps, { loadDeviceList })(DeviceList)
