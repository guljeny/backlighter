export default function throttle (func, time) {
  let inThrottle = false
  return function (...args) {
    const context = this
    if (inThrottle) return
    inThrottle = true
    func.apply(context, args)
    setTimeout(() => {
      inThrottle = false
    }, time)
  }
}
