import React from 'react'
import I18n from '$utils/I18n'
import showPopup from '$utils/showPopup'
import RegistrationForm from '$components/RegistrationForm'
import LoginPopup from '$components/popups/LoginPopup'

export default function RegisterPopup ({ closePopup }) {
  const showLoginPopup = () => {
    showPopup('login', LoginPopup)
    closePopup()
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-title">
          <I18n t="register_popup.title" />
        </div>
        <div className="popup-content">
          <RegistrationForm onSuccess={closePopup} showLogin={showLoginPopup} />
        </div>
        <div className="popup-close" onClick={closePopup} />
      </div>
    </div>
  )
}
