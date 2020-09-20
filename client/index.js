import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { bootstrapSockets } from './socket'

function bootstrap () {
  const container = document.getElementById('root')
  if (!container) return
  ReactDOM.render(<App />, container)
  bootstrapSockets()
}

bootstrap()
