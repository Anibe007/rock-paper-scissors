// Load score from localStorage or set defaults
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let isAutoPlaying = false;
let intervalId;

// Update score display
function updateScoreElement() {
    const jsScoreElement = document.querySelector('.js-score');
    jsScoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
updateScoreElement();

// Randomly pick a computer move
function pickComputer() {
    const play = ["rock", "paper", "scissors"];
    const computerPlay = Math.floor(Math.random() * 3);
    return play[computerPlay];
}

// Auto Play logic
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputer(); // Simulate random move
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

// Play one round
function playGame(playerMove) {
    const computerMove = pickComputer();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else {
            result = 'You win.';
        }
    }

    // Update score object
    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon1">
        <img src="images/${computerMove}-emoji.png" class="move-icon1">
        Computer`;

    document.querySelector('.number-of-score').innerHTML = 
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Reset game score
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
    document.querySelector('.number-of-score').innerHTML = 'Wins: 0, Losses: 0, Ties: 0';
}







//  LEARNING addEventListener
document.querySelector('.').addEventListener('click', () => {

})

document.querySelector('.class').addEventListener('click', () => {

});

document.querySelector('.').addEventListener('click', () => {
    
})