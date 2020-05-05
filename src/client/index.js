import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { bootstrapSockets } from './socket'

// const button = document.getElementById('toggle-button')
// let en = false

// button.addEventListener('click', () => {
//   socket.emit('toggle-enable', !en)
// })

// socket.on('toggle-enable', next => {
//   console.log(next)
// })

function bootstrap () {
  const container = document.getElementById('root')
  if (!container) return
  ReactDOM.render(<App />, container)
  bootstrapSockets()
}

bootstrap()
