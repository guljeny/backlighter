import React from 'react'
import LoginPopup from '$components/popups/LoginPopup'
import RegistrationPopup from '$components/popups/RegistrationPopup'
import { Button } from '$components/form'
import showPopup from '$utils/showPopup'
import I18n from '$utils/I18n'
import loginIcon from '$images/login.svg'

export default function LoginButtons () {
  return (
    <div className="header__buttons">
      <Button
        modifiers="btn--as-link header__register-button"
        onClick={() => showPopup('registration', RegistrationPopup)}
      >
        <I18n t="buttons.register" />
      </Button>
      <Button
        modifiers="header__login-button"
        onClick={() => showPopup('login', LoginPopup)}
      >
        <img src={loginIcon} alt="login" />
        <span>
          <I18n t="buttons.login" />
        </span>
      </Button>
    </div>
  )
}
