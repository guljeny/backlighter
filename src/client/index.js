import io from 'socket.io-client'

const socket = io()
const button = document.getElementById('toggle-button')
let en = false

button.addEventListener('click', () => {
  socket.emit('toggle-enable', !en)
})

socket.on('toggle-enable', next => {
  en = next
  button.innerHTML = en ? "off" : "enable"
});
