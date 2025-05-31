let randomNum = Math.floor(Math.random() * 100 + 1);

const guessField = document.getElementById('guessField');
const subt = document.getElementById('subt');
const resultParas = document.querySelector('.resultParas');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');

let numOfGuesses = 1;
let playGame = true;

if (playGame) {
  subt.addEventListener('click', (event) => {
    event.preventDefault();
    let guess = parseInt(guessField.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Enter a valid number!');
  } else if (guess < 1) {
    alert('Enter a number more than 1!');
  } else if (guess > 100) {
    alert('Enter a number less than 100!');
  } else {
    if (numOfGuesses === 11) {
      cleanAndDisplayGuess(guess);
      displayMessage(`Game Over. The answer is ${randomNum}`);
      endGame();
    } else {
      cleanAndDisplayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    displayMessage('You guessed it right');
    endGame();
  } else if (guess < randomNum) {
    displayMessage('You guessed number is too low');
  } else if (guess > randomNum) {
    displayMessage('You guessed number is too high');
  }
}

function cleanAndDisplayGuess(guess) {
  guessField.value = '';
  guesses.innerHTML += `${guess}, `;
  lastResult.innerText = `${10 - numOfGuesses}`;
  numOfGuesses++;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
  guessField.value = '';
  subt.setAttribute('disabled', '');
  guessField.setAttribute('disabled', '');

  playGame = false;
  p.innerHTML = `<button type="button" id="button" style="
    background-color: #28a745;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  ">Start new game</button>`;

  if (!document.getElementById('button')) {
    resultParas.appendChild(p);
  }
  document.getElementById('button').addEventListener('click', newGame);
}

function newGame() {
  // Reset game settings
  guessField.value = '';
  guesses.innerHTML = '';
  lowOrHi.innerHTML = '';
  numOfGuesses = 1;
  lastResult.innerHTML = `10`;
  guessField.removeAttribute('disabled');
  subt.removeAttribute('disabled');
  randomNum = Math.floor(Math.random() * 100 + 1);
  resultParas.removeChild(p);
  playGame = true;
}
