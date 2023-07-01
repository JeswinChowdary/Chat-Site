const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const socket = io('https://chat-app-by-jeswin.onrender.com/')
const userName = localStorage.getItem('userName');

if(!userName) {
    localStorage.setItem('userName', window.prompt('Please enter your name: ').toUpperCase());
}

function displayMessage(time, name, msg) {
    const messageContainer = document.querySelector('.message-container')
    const div = document.createElement('div');
    div.className = 'message';
    const spanHead = document.createElement('span');
    spanHead.className = 'msg-header';
    spanHead.innerText = name + ' • ' + time;
    const spanMain = document.createElement('span');
    spanMain.className = 'msg-main';
    spanMain.innerText = msg;
    div.append(spanHead, spanMain);
    messageContainer.append(div);

    const messageSound = document.querySelector('.hidden');
    messageSound.play();
}

function initialMessage() {
  const timeArr = new Date().toLocaleTimeString().split(':')
  const time = timeArr[1] + ':' + timeArr[2]
  displayMessage(time, userName, 'You joined the chat')
} initialMessage();


socket.on('chat-message', data => {
    displayMessage(data.time, data.userName, data.msg)
});
socket.on('new-user', (user) => {
    const timeArr = new Date().toLocaleTimeString().split(':')
    const time = timeArr[1] + ':' + timeArr[2]
    displayMessage(time, 'CHAT-MODERATOR', `${user} just joined the chat.`);
});
socket.emit('new-user', userName);

sendButton.addEventListener('click', e => {
    const msg = input.value;
    const timeArr = new Date().toLocaleTimeString().split(':');
    const time = timeArr[1] + ':' + timeArr[2];

    displayMessage(time, userName, msg);

    if(msg === '' || msg === ' ') {
        alert('Please type in a message first!');
        return;
    }

    socket.emit('chat-message', {
        userName: userName,
        time: time,
        msg: msg
    });
    
})