const msgEl = document.getElementById('msg');

// Generate random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = generateRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  
  writeMessage (msg);
  checkNumber (msg);
}

// Speak result
recognition.addEventListener('result', onSpeak);

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = ''; // This is fine because it's just clearing out old data, not passing in untrusted data
  const div = document.createElement('div');
  div.textContent = 'You said: ';
  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.innerHTML = '';
  msgEl.append(div, span);
}

// Check msg against the secret number
function checkNumber(msg) {
  let num = Number(msg);

   if (msg === 'one' || msg === 'won') {
    num = 1;
  } else if (msg === 'two') {
    num = 2;
  } else if (msg === 'three') {
    num = 3;
  } else if (msg === 'four') {
    num = 4;
  } else if (msg === 'five') {
    num = 5;
  } else if (msg === 'six') {
    num = 6;
  } else if (msg === 'seven') {
    num = 7;
  } else if (msg === 'eight') {
    num = 8;
  } else if (msg === 'nine') {
    num = 9;
  }
  
  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.innerHTML = '';
    msgEl.append(div);

    return;
  }


  if (num < 1 || num > 100) {
    const div = document.createElement ('div');
    div.textContent = 'Number must be between 1 and 100';
    msgEl.innerHTML = '';
    msgEl.append(div);

    return;
  }

  if (num === randomNum) {
    const h2 = document.createElement ('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

    const button = document.createElement ('button');
    button.classList.add('play-again')
    button.id = 'play-again'
    button.textContent = 'Play Again'
    button.addEventListener('click', () => window.location.reload());

    msgEl.innerHTML = '';
    msgEl.append(h2, button);
  } else if (num > randomNum) {
    const div = document.createElement('div')
    div.textContent = 'Go Lower';

    msgEl.innerHTML = '';
    msgEl.append(div);
  } else { const div = document.createElement('div')
    div.textContent = 'Go Higher';

    msgEl.innerHTML = '';
    msgEl.append(div);
  }
}

recognition.addEventListener ('end', () => recognition.start());

