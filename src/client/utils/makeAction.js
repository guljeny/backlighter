export default function (type) {
  return function (payload) {
    return { type, payload }
  }
}
