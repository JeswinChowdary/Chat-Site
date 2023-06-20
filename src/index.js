const socket = io('https://chat-app-by-jeswin.onrender.com:5000')
const messageContainer = document.querySelector('.message-container');
const input = document.getElementById('input');
const send = document.getElementById('send');
const name = window.prompt('What is your name?');

function displayMessage(msg) {
  console.log(msg)
  messageContainer.innerHTML += `
  <span class="message">${msg}</span>
  `
}

socket.on('chat-message', (msg) => {
  displayMessage(msg);
});

send.addEventListener('click', () => {
  const message = `${name}: ${input.value}`;

  displayMessage(message);

  socket.emit('chat-message', message);
  message.value = '';
})