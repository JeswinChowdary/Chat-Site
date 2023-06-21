const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const port = 5000;
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', 'https://chat-app-by-jeswin.onrender.com']
  }
});


app.use(express.static('./src'));


io.on('connection', socket => {
  socket.emit('chat-message', 'Someone Just Joined The Chat');

  socket.on('chat-message', (msg) => {
    socket.broadcast.emit('chat-message', msg);
  })
});

server.listen(port, console.log(`Port: ${port}`))