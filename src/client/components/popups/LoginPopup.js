import React from 'react'
import I18n from '$utils/I18n'
import LoginForm from '$components/LoginForm'

export default function LoginPopup ({ closePopup }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-title">
          <I18n t="login_popup.title" />
        </div>
        <LoginForm onSuccess={closePopup} />
        <div className="popup-close" onClick={closePopup} />
      </div>
    </div>
  )
}
