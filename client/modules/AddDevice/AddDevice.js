import React, { useState } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import I18n from '$utils/I18n'
import checkIsFormValid from '$utils/checkIsFormValid'
import validateForm from '$utils/validateForm'
import LoginForm from '$components/LoginForm'
import RegistrationForm from '$components/RegistrationForm'
import { Input, Button } from '$components/form'
import api from '$api/device'

import './addDevice.scss'

function AddDevice ({ history, authorized, match: { params: { uid } } }) {
  const [loading, setLoading] = useState(false)
  const [isLoginFormVisible, showLoginForm] = useState(false)
  const addDevice = async (values, { setErrors }) => {
    setLoading(true)
    try {
      const { success, payload } = await api.create(values)
      if (!success) return setErrors(payload)
      history.replace('/control-panel')
    } catch (errors) {
      setLoading(false)
    }
  }
  return (
    <div className="add-device">
      {authorized ? (
        <Formik
          initialValues={{ deviceName: '', uid }}
          validate={validateForm}
          onSubmit={addDevice}
        >
          {({ handleSubmit, values, errors }) => (
            <form className="form" onSubmit={handleSubmit}>
              <Input name="deviceName" />
              <div className="form__buttons">
                <Button
                  modifiers="btn--primary"
                  loading={loading}
                  disabled={!checkIsFormValid(values, errors)}
                >
                  <I18n t="buttons.add" />
                </Button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <>
          {isLoginFormVisible ? (
            <LoginForm showRegistration={() => showLoginForm(false)} />
          ) : (
            <RegistrationForm showLogin={() => showLoginForm(true)} />
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
})

export default connect(mapStateToProps)(AddDevice)
