import React from 'react'
import I18n from '$utils/I18n'

export default function Errors ({ errors }) {
  if (!errors || !errors.length) return null
  return (
    <div className="form-field__errors">
      {errors.map(error => <span key={error}><I18n t={error} /></span>)}
    </div>
  )
}
