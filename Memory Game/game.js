let scorediv = document.querySelector('.score1');  
let score = parseInt(scorediv.innerText);
let movediv = document.querySelector('.moves');
let moves = parseInt(movediv.innerText); 
let time = document.querySelector('.timer'); 
let min = 0, sec = 0;
let lockboard = false;
// let scorejs = 0;
let interval = null;
// intervals1();

function intervals1(){
    if (score === 8) {
        clearInterval(interval);
        interval = null;
        setTimeout(() => {
            alert("You win!");
            restart();
        }, 2000);
    }
}

function restart(){
    min = 0 ; sec = 0 ;
    lockboard = false;
    score = 0;
    scorediv.innerHTML = score;
    moves = 0;
    movediv.innerHTML = 0;
    
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });

    clearInterval(interval);
    interval = null;
    timestart();
}

function timestart() {
    if (interval !== null) {
        return;
    }

    interval = setInterval(() => {
        if (sec === 59) {
            min++;
            sec = 0;
        }
        sec++;
        let displayMin = String(min).padStart(2, '0');
        let displaySec = String(sec).padStart(2, '0');
        time.innerHTML = `${displayMin}:${displaySec}`;
    }, 1000);
}
timestart();
// console.log(time);  

const cards = document.querySelectorAll('.btn')

let hasFlippedCard = false;
let firstCard, secondCard;
function flipCard() {
    if (lockboard || this == firstCard) {
        return;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    lockboard = true; 
    secondCard = this; 
    match(); 
}
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

function match() {
    movediv.innerHTML = ++moves; 
    let match = firstCard.dataset.framework === secondCard.dataset.framework;

    match ? disablecard() : unflip();
}

function disablecard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score++;
    scorediv.innerText = score;
    resetboard();
    intervals1();
}

function unflip() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetboard();
    }, 1500);
}

function resetboard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

 function startGame() {
            window.location.href = "game.html"; // Navigate to game.html
        }
