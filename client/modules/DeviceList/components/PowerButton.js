import React from 'react'
import classnames from 'classnames'
import PowerIcon from './PowerIcon'

export default function PowerButton ({ enabled, onClick }) {
  return (
    <div
      onClick={onClick}
      className={classnames(
        'device-list__power-button',
        !enabled && 'device-list__power-button--enabled',
      )}
    >
      <div className="device-list__power-button-content">
        <PowerIcon />
      </div>
    </div>
  )
}
