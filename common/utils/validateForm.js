function email ({ email }) {
  if (!email || !email.length) return ['errors.user.email_is_empty']
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return ['errors.user.email_invalid']
  return null
}

function password ({ password }) {
  if (!password || password.length < 8) return ['errors.user.password_to_short']
  return null
}

function repeatPassword ({ password, repeatPassword }) {
  if (!repeatPassword) return ['errors.user.not_be_empty']
  if (password && password !== repeatPassword) return ['errors.user.password_do_not_match']
  return null
}

function deviseName ({ deviseName }) {
  if (!deviseName) return ['errors.user.not_be_empty']
  return null
}

function uid ({ uid }) {
  if (!uid) return ['errors.user.not_be_empty']
  return null
}

const validators = {
  email,
  password,
  repeatPassword,
  deviseName,
  uid,
}

export default function validateForm (formData) {
  const errors = Object.keys(formData).reduce((acc, key) => {
    if (!validators[key]) return acc
    const errors = validators[key](formData)
    if (!errors || !errors.length) return acc
    return {
      ...acc,
      [key]: errors,
    }
  }, {})
  return Object.keys(errors).length ? errors : null
}
