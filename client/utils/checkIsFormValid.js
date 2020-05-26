export default function (values, errors) {
  return !Object.keys(errors).length && Object.values(values).reduce((acc, v) => !!v && acc, true)
}
