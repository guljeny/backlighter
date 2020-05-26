import React from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import I18n from '$utils/I18n'
import checkIsFormValid from '$utils/checkIsFormValid'
import validateForm from '$utils/validateForm'
import LoginForm from '$components/LoginForm'
import RegistrationForm from '$components/RegistrationForm'
import { Field, Button } from '$components/form'
import api from './api'

import './addDevise.scss'

class AddDevise extends React.Component {
  state = {
    isLoginFormActive: true,
    loading: false,
  }

  showLoginForm = () => this.setState({ isLoginFormActive: true })

  showRegistrationForm = () => this.setState({ isLoginFormActive: false })

  addDevise = async (values, { setErrors }) => {
    const { history } = this.props
    this.setState({ loading: true })
    try {
      const { success, payload } = await api.add(values)
      if (!success) {
        setErrors(payload)
        return
      }
      history.replace('/devises')
    } catch (errors) {
      this.setState({ loading: false })
    }
  }

  render () {
    const { authorized, match } = this.props
    const { uid } = match.params
    const { isLoginFormActive, loading } = this.state
    return (
      <div className="container add-devise">
        {authorized ? (
          <Formik
            initialValues={{ deviseName: '', uid }}
            validate={validateForm}
            onSubmit={this.addDevise}
          >
            {({ handleSubmit, values, errors }) => (
              <form className="form" onSubmit={handleSubmit}>
                <Field name="deviseName"><input /></Field>
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
            {isLoginFormActive ? (
              <LoginForm
                showRegistration={this.showRegistrationForm}
              />
            ) : (
              <RegistrationForm
                showLogin={this.showLoginForm}
              />
            )}
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  authorized: user.authorized,
})

export default connect(mapStateToProps)(AddDevise)
