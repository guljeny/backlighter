import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import request from '$utils/request'
import I18n from '$utils/I18n'
import validateForm from '$utils/validateForm'
import checkIsFormValid from '$utils/checkIsFormValid'
import { Field, Button } from '$components/form'
import { updateUser } from '$actions/user'

function LoginForm ({ onSuccess, updateUser }) {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values, { setErrors }) => {
    setLoading(true)
    try {
      const { success, payload } = await request.post('api/user/login', values)
      if (success) {
        updateUser(payload)
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
        <form className="popup-contnent" onSubmit={handleSubmit}>
          <Field name="email"><input /></Field>
          <Field name="password"><input type="password" /></Field>
          <div className="popup-buttons">
            <Button loading={loading} disabled={!checkIsFormValid(values, errors)}>
              <I18n t="buttons.login" />
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default connect(null, { updateUser })(LoginForm)
