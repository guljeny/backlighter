import React from 'react'
import classnames from 'classnames'
import PowerButton from './PowerButton'
import Bright from './Bright'
import api from '../api'

export default class ListItem extends React.Component {
  disable = () => {
    const { uid } = this.props
    api.disable(uid)
  }

  enable = () => {
    const { uid } = this.props
    api.enable(uid)
  }

  render () {
    const { name, enabled, isOnline, bright, uid } = this.props
    return (
      <div className={
        classnames(
          'devise-list__item-wrapper',
          !isOnline && 'devise-list__item-wrapper--offline',
        )
      }
      >
        {!isOnline && (
          <div className="devise-list__offline">
            Offline
          </div>
        )}
        <div className="devise-list__item">
          <PowerButton
            enabled={enabled}
            onClick={enabled ? this.disable : this.enable}
          />
          <div className="devise-list__item-content">
            {name}
          </div>
          <Bright bright={bright} uid={uid} />
        </div>
      </div>
    )
  }
}
