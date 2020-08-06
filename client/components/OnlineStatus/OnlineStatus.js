import React from 'react'
import classnames from 'classnames'

import './onlineStatus.scss'

export default function OnlineStatus ({ isOnline }) {
  return (
    <div className={classnames('online-status', isOnline && 'online-status--online')} />
  )
}
