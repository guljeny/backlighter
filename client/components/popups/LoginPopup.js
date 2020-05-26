import React from 'react'
import I18n from '$utils/I18n'
import showPopup from '$utils/showPopup'
import LoginForm from '$components/LoginForm'
import RegistrationPopup from '$components/popups/RegistrationPopup'

export default function LoginPopup ({ closePopup }) {
  const showRegistrationPopup = () => {
    showPopup('registration', RegistrationPopup)
    closePopup()
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-title">
          <I18n t="login_popup.title" />
        </div>
        <div className="popup-content">
          <LoginForm onSuccess={closePopup} showRegistration={showRegistrationPopup} />
        </div>
        <div className="popup-close" onClick={closePopup} />
      </div>
    </div>
  )
}
