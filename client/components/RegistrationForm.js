import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import api from '$api/user'
import I18n from '$utils/I18n'
import validateForm from '$utils/validateForm'
import checkIsFormValid from '$utils/checkIsFormValid'
import { Field, Button } from '$components/form'
import { updateUser, CONNECT_USER } from '$actions/user'
import socket from '$socket'

function RegistrationForm ({ onSuccess, updateUser, showLogin }) {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values, { setErrors }) => {
    setLoading(true)
    try {
      const { success, payload } = await api.register(values)
      if (success) {
        updateUser(payload)
        socket.emit(CONNECT_USER, payload.id)
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
      initialValues={{ email: '', password: '', repeatPassword: '' }}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, errors }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Field name="email"><input /></Field>
          <Field name="password"><input type="password" /></Field>
          <Field name="repeatPassword"><input type="password" /></Field>
          <div className="form__buttons">
            <Button loading={loading} disabled={!checkIsFormValid(values, errors)}>
              <I18n t="buttons.register" />
            </Button>
          </div>
          <div className="form__bottom-text">
            <I18n t="register_popup.already_registered" />
            <Button modifiers="btn--as-link" type="button" onClick={showLogin}>
              <I18n t="buttons.login" />
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default connect(null, { updateUser })(RegistrationForm)
