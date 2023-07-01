const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const port = 5000;
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', 'https://chat-app-by-jeswin.onrender.com/']
  }
});


app.use(express.static('./src'));

io.on('connection', socket => {
  socket.on('new-user',(userName) => {
    socket.broadcast.emit('new-user', userName);
  });
  socket.on('chat-message', data => {
    socket.broadcast.emit('chat-message', data);
  });
});

server.listen(port, console.log(`Port: ${port}`));