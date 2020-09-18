export default function throttle (func, time) {
  let inThrottle = false
  let timeouId = null
  return function (...args) {
    const context = this
    clearTimeout(timeouId)
    timeouId = setTimeout(() => {
      inThrottle = false
      func.apply(context, args)
    }, time)
    if (!inThrottle) {
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, time)
    }
  }
}
