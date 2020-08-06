function preventEvent (e) {
  e.preventDefault()
}

export default {
  enable: () => {
    document.removeEventListener('selectstart', preventEvent)
  },
  disable: () => {
    document.addEventListener('selectstart', preventEvent)
  },
}
