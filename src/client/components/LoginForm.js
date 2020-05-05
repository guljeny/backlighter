import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import api from '$api/user'
import I18n from '$utils/I18n'
import validateForm from '$utils/validateForm'
import checkIsFormValid from '$utils/checkIsFormValid'
import { Field, Button } from '$components/form'
import { updateUser } from '$actions/user'
import socket from '$socket'
import { USER_CONNECTION } from '$socket/actions'

function LoginForm ({ onSuccess, updateUser, showRegistration }) {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values, { setErrors }) => {
    setLoading(true)
    try {
      const { success, payload } = await api.login(values)
      if (success) {
        updateUser(payload)
        socket.emit(USER_CONNECTION, payload.id)
        onSuccess && onSuccess()
        return
      }
      payload && setErrors(payload)
      setLoading(false)
    } catch (errors) {
      setLoading(false)
    }
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, errors }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Field name="email"><input /></Field>
          <Field name="password"><input type="password" /></Field>
          <div className="form__buttons">
            <Button modifiers="btn--primary" loading={loading} disabled={!checkIsFormValid(values, errors)}>
              <I18n t="buttons.login" />
            </Button>
          </div>
          <div className="form__bottom-text">
            <I18n t="login_popup.not_registered" />
            <Button modifiers="btn--as-link" type="button" onClick={showRegistration}>
              <I18n t="buttons.register" />
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default connect(null, { updateUser })(LoginForm)