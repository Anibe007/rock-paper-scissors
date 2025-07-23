// Load score from localStorage or set defaults
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Audio elements
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const drawSound = document.getElementById('drawSound');

// Track autoplay state
let isAutoPlaying = false;
let intervalId;

// Update score display
function updateScoreElement() {
  const jsScoreElement = document.querySelector('.js-score');
  jsScoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScoreElement();

// Pick a random move for computer
function pickComputer() {
  const options = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * 3);
  return options[index];
}

// Play the game with user move
function playGame(playerMove) {
  const computerMove = pickComputer();
  let result = '';

  // Play click sound
  if (clickSound) clickSound.play();

  // Determine game result
  if (playerMove === computerMove) {
    result = 'Tie.';
    score.ties++;
    if (drawSound) drawSound.play();
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'You win.';
    score.wins++;
    if (winSound) winSound.play();
  } else {
    result = 'You lose.';
    score.losses++;
    if (loseSound) loseSound.play();
  }

  // Save updated score
  localStorage.setItem('score', JSON.stringify(score));

  // Display result and moves
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You 
    <img src="images/${playerMove}-emoji.png" class="move-icon1">
    <img src="images/${computerMove}-emoji.png" class="move-icon1">
    Computer`;

  document.querySelector('.number-of-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  updateScoreElement();
}

// Auto-play toggle
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputer(); // Random simulated player move
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// Reset game score
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();

  // Clear result displays
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
  document.querySelector('.number-of-score').innerHTML = 'Wins: 0, Losses: 0, Ties: 0';

  // Optional reset sound (reuse click)
  if (clickSound) clickSound.play();
}
