const app = require('express')();
var socketIO = require('socket.io');
const path = require('path');

let en = false

app.get('/', function (req, res) {
  console.log("request")
  res.sendFile(path.join(__dirname, '../src/client/index.html'));
});

app.get('/build/index.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/client/bundle.js'));
});

const server = app.listen(process.env.PORT || 3000);

const io = socketIO.listen(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('toggle-enable', en)
  socket.on('toggle-enable', next => {
    en = next
    socket.emit('toggle-enable', en)
    socket.broadcast.emit('toggle-enable', en)
    console.log(en)
  });
});
