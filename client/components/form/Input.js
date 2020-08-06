import React from 'react'
import { useFormikContext } from 'formik'
import classnames from 'classnames'
import Errors from '$components/form/Errors'
import I18n from '$utils/I18n'
import toSnakeCase from '$utils/toSnakeCase'

const Input = React.forwardRef(({ name, ...rest }, ref) => {
  const { values, touched, errors, handleChange, setFieldTouched } = useFormikContext()
  const withError = touched[name] && errors[name]
  return (
    <div
      className={classnames('form__field', withError && 'form__field-error')}
    >
      <input
        ref={ref}
        name={name}
        value={values[name]}
        placeholder={I18n.t(`fields.${toSnakeCase(name)}`)}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name)}
        {...rest}
      />
      {withError && <Errors errors={errors[name]} />}
    </div>
  )
})

export default Input
