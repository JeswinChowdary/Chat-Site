const socket = io('https://chat-app-by-jeswin.onrender.com/')
const messageContainer = document.querySelector('.message-container');
const input = document.getElementById('input');
const send = document.getElementById('send');
const userName = window.prompt('What is your name?');

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
  const message = `${userName}: ${input.value}`;

  displayMessage(message);

  socket.emit('chat-message', message);
  input.value = '';
})