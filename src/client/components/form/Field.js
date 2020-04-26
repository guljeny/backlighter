import React from 'react'
import { useFormikContext } from 'formik'
import classnames from 'classnames'
import Errors from '$components/form/Errors'
import I18n from '$utils/I18n'
import toSnakeCase from '$utils/toSnakeCase'

export default function ({ name, children }) {
  const { values, touched, errors, handleChange, setFieldTouched } = useFormikContext()
  const childrenWithFormik = React.cloneElement(children, {
    name,
    value: values[name],
    placeholder: I18n.t(`fields.${toSnakeCase(name)}`),
    onChange: handleChange,
    onBlur: () => setFieldTouched(name),
  })
  const withError = touched[name] && errors[name]
  return (
    <div className={classnames('form-field', withError && 'form-field--error')}>
      {childrenWithFormik}
      {touched[name] && <Errors errors={errors[name]} />}
    </div>
  )
}
