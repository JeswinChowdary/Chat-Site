const express = require('express');
const io = require('socket.io')(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const app = express();



io.on('connection', socket => {
  socket.emit('chat-message', 'Someone Just Joined The Chat');

  socket.on('chat-message', (msg) => {
    socket.broadcast.emit('chat-message', msg);
  })
});
