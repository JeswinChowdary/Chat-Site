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
  'FUCK?',
  'nigga?',
  'nigga',
  'bitch?',
  'FYCKING',
  'fuck?',
  'bozo',
  'kare',
  'fuck?',
  'FUCK!',
  'FUCKU',
  'FUCKYOU',
  'FUCK$',
  'FUCK#',
  'shit',
  '4r5e',
  '5h1t',
  '5hit',
  'a55',
  'anal',
  'anus',
  'ar5e',
  'fuc',
  'alok',
  'suck',
  'sucks',
  'com',
  'negroe',
  'negroi',
  'negro',
  '.com',
  '.in',
  'arrse',
  'arse',
  'pinda',
  'ass',
  'ass-fucker',
  'asses',
  'assfucker',
  'assfukka',
  'asshole',
  'assholes',
  'asswhole',
  'a_s_s',
  'b!tch',
  'b00bs',
  'b17ch',
  'b1tch',
  'ballbag',
  'balls',
  'ballsack',
  'bastard',
  'beastial',
  'beastiality',
  'bellend',
  'bestial',
  'bestiality',
  'bi+ch',
  'biatch',
  'bitch',
  'bitcher',
  'FUCKER',
  'FUCK',
  'MOTHERFUCKER',
  'BEVARSE',
  'BEVARSI',
  'Madarchod',
  'madarchod',
  'MADARCHOD',
  'fucker',
  'f',
  'F',
  'https://',
  'bitchers',
  'bitches',
  'bitchin',
  'bitching',
  'bloody',
  'blow job',
  'blowjob',
  'blowjobs',
  'boiolas',
  'bollock',
  'bollok',
  'boner',
  'boob',
  'boobs',
  'booobs',
  'boooobs',
  'booooobs',
  'booooooobs',
  'breasts',
  'buceta',
  'bugger',
  'bum',
  'bunny fucker',
  'butt',
  'butthole',
  'buttmuch',
  'buttplug',
  'c0ck',
  'c0cksucker',
  'carpet muncher',
  'cawk',
  'chink',
  'cipa',
  'cl1t',
  'clit',
  'clitoris',
  'clits',
  'cnut',
  'cock',
  'cock-sucker',
  'cockface',
  'cockhead',
  'cockmunch',
  'cockmuncher',
  'cocks',
  'cocksuck',
  'cocksucked',
  'cocksucker',
  'cocksucking',
  'cocksucks',
  'cocksuka',
  'cocksukka',
  'cok',
  'cokmuncher',
  'coksucka',
  'coon',
  'cox',
  'crap',
  'cum',
  'cummer',
  'cumming',
  'cums',
  'cumshot',
  'cunilingus',
  'cunillingus',
  'cunnilingus',
  'cunt',
  'cuntlick',
  'cuntlicker',
  'cuntlicking',
  'cunts',
  'cyalis',
  'cyberfuc',
  'cyberfuck',
  'cyberfucked',
  'cyberfucker',
  'cyberfuckers',
  'cyberfucking',
  'd1ck',
  'damn',
  'dick',
  'dickhead',
  'dildo',
  'dildos',
  'dink',
  'dinks',
  'dirsa',
  'dlck',
  'dog-fucker',
  'doggin',
  'dogging',
  'donkeyribber',
  'doosh',
  'duche',
  'dyke',
  'ejaculate',
  'ejaculated',
  'ejaculates',
  'ejaculating',
  'ejaculatings',
  'ejaculation',
  'ejakulate',
  'f u c k',
  'f u c k e r',
  'f4nny',
  'fag',
  'fagging',
  'faggitt',
  'faggot',
  'faggs',
  'fagot',
  'fagots',
  'fags',
  'fanny',
  'fannyflaps',
  'fannyfucker',
  'fanyy',
  'fatass',
  'fcuk',
  'fcuker',
  'fcuking',
  'feck',
  'fecker',
  'felching',
  'fellate',
  'fellatio',
  'fingerfuck',
  'fingerfucked',
  'fingerfucker',
  'fingerfuckers',
  'fingerfucking',
  'fingerfucks',
  'fistfuck',
  'fistfucked',
  'fistfucker',
  'fistfuckers',
  'fistfucking',
  'fistfuckings',
  'fistfucks',
  'flange',
  'fook',
  'fooker',
  'fuck',
  'fucka',
  'fucked',
  'fucker',
  'fuckers',
  'fuckhead',
  'fuckheads',
  'fuckin',
  'fucking',
  'fuckings',
  'fuckingshitmotherfucker',
  'fuckme',
  'fucks',
  'fuckwhit',
  'fuckwit',
  'fudge packer',
  'fudgepacker',
  'fuk',
  'fuker',
  'fukker',
  'fukkin',
  'fuks',
  'fukwhit',
  'fukwit',
  'fux',
  'fux0r',
  'f_u_c_k',
  'gangbang',
  'gangbanged',
  'gangbangs',
  'gaylord',
  'gaysex',
  'goatse',
  'God',
  'god-dam',
  'god-damned',
  'goddamn',
  'goddamned',
  'hardcoresex',
  'hell',
  'heshe',
  'hoar',
  'hoare',
  'hoer',
  'homo',
  'hore',
  'horniest',
  'horny',
  'hotsex',
  'jack-off',
  'jackoff',
  'jap',
  'jerk-off',
  'jism',
  'jiz',
  'jizm',
  'jizz',
  'kawk',
  'knob',
  'knobead',
  'knobed',
  'knobend',
  'knobhead',
  'knobjocky',
  'knobjokey',
  'kock',
  'kondum',
  'kondums',
  'kum',
  'kummer',
  'kumming',
  'kums',
  'kunilingus',
  'l3i+ch',
  'l3itch',
  'labia',
  'lust',
  'lusting',
  'm0f0',
  'm0fo',
  'm45terbate',
  'ma5terb8',
  'ma5terbate',
  'masochist',
  'master-bate',
  'masterb8',
  'masterbat*',
  'masterbat3',
  'masterbate',
  'masterbation',
  'masterbations',
  'masturbate',
  'mo-fo',
  'mof0',
  'mofo',
  'mothafuck',
  'mothafucka',
  'mothafuckas',
  'mothafuckaz',
  'mothafucked',
  'mothafucker',
  'mothafuckers',
  'mothafuckin',
  'mothafucking',
  'mothafuckings',
  'mothafucks',
  'mother fucker',
  'motherfuck',
  'motherfucked',
  'motherfucker',
  'motherfuckers',
  'motherfuckin',
  'motherfucking',
  'motherfuckings',
  'motherfuckka',
  'motherfucks',
  'muff',
  'mutha',
  'muthafecker',
  'muthafuckker',
  'muther',
  'mutherfucker',
  'n1gga',
  'n1gger',
  'nazi',
  'nigg3r',
  'nigg4h',
  'nigga',
  'niggah',
  'niggas',
  'niggaz',
  'nigger',
  'niggers',
  'nob',
  'nob jokey',
  'nobhead',
  'nobjocky',
  'nobjokey',
  'numbnuts',
  'nutsack',
  'orgasim',
  'orgasims',
  'orgasm',
  'orgasms',
  'p0rn',
  'pawn',
  'pecker',
  'penis',
  'penisfucker',
  'phonesex',
  'phuck',
  'phuk',
  'phuked',
  'phuking',
  'phukked',
  'phukking',
  'phuks',
  'phuq',
  'pigfucker',
  'pimpis',
  'piss',
  'pissed',
  'pisser',
  'pissers',
  'pisses',
  'pissflaps',
  'pissin',
  'pissing',
  'pissoff',
  'poop',
  'porn',
  'porno',
  'pornography',
  'pornos',
  'prick',
  'pricks',
  'pron',
  'pube',
  'pusse',
  'pussi',
  'pussies',
  'pussy',
  'pussys',
  'rectum',
  'retard',
  'rimjaw',
  'rimming',
  's hit',
  's.o.b.',
  'sadist',
  'schlong',
  'screwing',
  'scroat',
  'scrote',
  'scrotum',
  'semen',
  'sex',
  'sh!+',
  'sh!t',
  'sh1t',
  'shag',
  'shagger',
  'shaggin',
  'shagging',
  'shemale',
  'shi+',
  'shit',
  'shitdick',
  'shite',
  'shited',
  'shitey',
  'shitfuck',
  'shitfull',
  'shithead',
  'shiting',
  'shitings',
  'shits',
  'shitted',
  'shitter',
  'shitters',
  'shitting',
  'shittings',
  'shitty',
  'skank',
  'slut',
  'sluts',
  'smegma',
  'smut',
  'snatch',
  'son-of-a-bitch',
  'spac',
  'spunk',
  's_h_i_t',
  't1tt1e5',
  't1tties',
  'teets',
  'teez',
  'testical',
  'testicle',
  'tit',
  'titfuck',
  'tits',
  'titt',
  'tittie5',
  'tittiefucker',
  'titties',
  'tittyfuck',
  'tittywank',
  'titwank',
  'tosser',
  'turd',
  'tw4t',
  'twat',
  'twathead',
  'twatty',
  'twunt',
  'twunter',
  'v14gra',
  'v1gra',
  'vagina',
  'viagra',
  'vulva',
  'w00se',
  'wang',
  'wank',
  'wanker',
  'wanky',
  'whoar',
  'whore',
  'willies',
  'willy',
  'xrated',
  'xxx',
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
    const msg = input.value
    const timeArr = new Date().toLocaleTimeString().split(':')
    const time = timeArr[0] + ':' + timeArr[1]
    const msgArray = msg.split(' ')
    swearWordsArray.forEach((word) => {
      msgArray.forEach((clientWord) => {
        if (clientWord === word || clientWord.contains(word)) {
          return (isSwearing = true)
        }
      })
    })
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
     swearWordsArray.forEach((word) => {
       msgArray.forEach((clientWord) => {
         if (clientWord === word) {
           return (isSwearing = true)
         }
       })
     })
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