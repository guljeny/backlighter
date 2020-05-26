import React from 'react'
import I18n from '$utils/I18n'
import showPopup from '$utils/showPopup'
import { withPopupAnimation } from '$components/Popup'
import LoginForm from '$components/LoginForm'
import RegistrationPopup from '$components/popups/RegistrationPopup'

function LoginPopup ({ closePopup }) {
  const showRegistrationPopup = () => {
    showPopup('registration', RegistrationPopup)
    closePopup()
  }

  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup__title">
          <I18n t="login_popup.title" />
        </div>
        <div className="popup__content">
          <LoginForm onSuccess={closePopup} showRegistration={showRegistrationPopup} />
        </div>
        <div className="popup__close" onClick={closePopup} />
      </div>
    </div>
  )
}

export default withPopupAnimation(LoginPopup)
