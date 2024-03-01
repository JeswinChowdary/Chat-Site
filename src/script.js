const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const socket = io('https://chat-app-by-jeswin.onrender.com/')
var userName = localStorage.getItem('userName');
if(!userName) {
  alert('Please enter a user name to start messaging here!');
  window.location.reload();
}
var canSend = true;
const swearWordsArray = [
 
]

if(!userName) {
    localStorage.setItem('userName', window.prompt('Please enter your name: ').toUpperCase());
    userName = localStorage.getItem('userName');
}


function displayMessage(time, userName, msg) {
    const messageContainer = document.querySelector('.message-container')
    const div = document.createElement('div');
    div.className = 'message';
    const spanHead = document.createElement('span');
    spanHead.className = 'msg-header';
    spanHead.innerText = userName + ' • ' + time;
    const spanMain = document.createElement('span');
    spanMain.className = 'msg-main';
    spanMain.innerText = msg;
    div.append(spanHead, spanMain);
    messageContainer.append(div);

    const messageSound = document.querySelector('.hidden');
    messageSound.play();
    var height = document.body.scrollHeight
    window.scroll(0, height);

}



// String to test swear words filter

function initialMessage() {
  const timeArr = new Date().toLocaleTimeString().split(':')
  const time = timeArr[0] + ':' + timeArr[1]
  displayMessage(time, userName, 'You joined the chat')
} initialMessage();


socket.on('chat-message', data => {
    displayMessage(data.time, data.userName, data.msg)
});
socket.on('new-user', (user) => {
    const timeArr = new Date().toLocaleTimeString().split(':')
    const time = timeArr[0] + ':' + timeArr[1]
    displayMessage(time, 'CHAT-MODERATOR', `${user} just joined the chat.`);
});
socket.emit('new-user', userName);
socket.on('messagesArr', messages => {
    messages.forEach(message => {
        displayMessage(message.time, message.userName, message.msg);
    })
})

sendButton.addEventListener('click', e => {
    if (canSend === false) {
      alert('The message you have entered contains illegal words...')
      return
    }
    var isSwearing = false
    const msg = input.value;
    const timeArr = new Date().toLocaleTimeString().split(':')
    const time = timeArr[0] + ':' + timeArr[1]
    swearWordsArray.forEach(word => {
      if(msg.includes(word)) {
        return isSwearing = true;
      }
    });
    if (msg.length > 350) {
      alert('Your message exceeds the word limit of 350')
      input.value = ''
      return
    }
    if (isSwearing === true) {
      alert(
        'The message contains words which are not allowed, please re-check what you type!'
      )
      input.value = ''
      return
    }

    
    if (msg === '' || msg === ' ') {
        alert('Please type in a message first!')
        return
    }
    displayMessage(time, userName, msg);

    socket.emit('chat-message', {
      userName: userName,
      time: time,
      msg: msg,
    })
    canSend = false
    setTimeout(() => {
      canSend = true
    }, 4000)
    input.value = ''
    
})
document.addEventListener('keypress', (event) => {
    if(event.key !== 'Enter') {
        return;
    }

     if (canSend === false) {
       alert('The message you have entered contains illegal words...')
       return
     }
     var isSwearing = false
     const msg = input.value
     const timeArr = new Date().toLocaleTimeString().split(':')
     const time = timeArr[0] + ':' + timeArr[1]
     const msgArray = msg.split(' ')
     swearWordsArray.forEach(word => {
      if(msg.includes(word)) {
        return isSwearing = true;
      }
     });
     if (msg.length > 350) {
       alert('Your message exceeds the word limit of 350')
       input.value = ''
       return
     }
     if (isSwearing === true) {
        alert(
         'The message contains words which are not allowed, please re-check what you type!'
       );
       input.value = '';
       return;
     }

     displayMessage(time, userName, msg)

     if (msg === '' || msg === ' ') {
       alert('Please type in a message first!')
       return;
     }

     socket.emit('chat-message', {
       userName: userName,
       time: time,
       msg: msg,
     })
     canSend = false
     setTimeout(() => {
       canSend = true
     }, 4000)
     input.value = ''
})
