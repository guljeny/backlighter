import io from 'socket.io-client'

const socket = io()
const button = document.getElementById('toggle-button')
button.addEventListener('click', () => {
  socket.emit('toggle-enable')
})
socket.on('toggle-enable', (en) => {
  button.innerHTML = en ? "off" : "on"
});
