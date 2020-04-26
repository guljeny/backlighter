import React from 'react'
import classnames from 'classnames'

export default function Button ({ children, disabled, loading, modifiers, ...rest }) {
  return (
    <button
      disabled={disabled || loading}
      className={classnames('btn', loading && 'loading', modifiers || '')}
      {...rest}
    >
      {children}
    </button>
  )
}
