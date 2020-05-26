import React from 'react'
import I18n from '$utils/I18n'
import showPopup from '$utils/showPopup'
import { withPopupAnimation } from '$components/Popup'
import RegistrationForm from '$components/RegistrationForm'
import LoginPopup from '$components/popups/LoginPopup'

function RegisterPopup ({ closePopup }) {
  const showLoginPopup = () => {
    showPopup('login', LoginPopup)
    closePopup()
  }

  return (
    <>
      <div className="popup__title">
        <I18n t="register_popup.title" />
      </div>
      <div className="popup__content">
        <RegistrationForm onSuccess={closePopup} showLogin={showLoginPopup} />
      </div>
      <div className="popup__close" onClick={closePopup} />
    </>
  )
}

export default withPopupAnimation(RegisterPopup)
