import React from 'react'
import ReactDOM from 'react-dom'
// import io from 'socket.io-client'
import App from './App'

// const socket = io()
// const button = document.getElementById('toggle-button')
// let en = false

// button.addEventListener('click', () => {
//   socket.emit('toggle-enable', !en)
// })

// socket.on('toggle-enable', next => {
//   en = next
//   button.innerHTML = en ? 'off' : 'enable'
// })

function bootstrap () {
  const container = document.getElementById('root')
  if (!container) return
  ReactDOM.render(<App />, container)
}

bootstrap()
