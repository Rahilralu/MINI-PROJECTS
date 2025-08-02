let score = parseInt(document.querySelector('score').innerHTML);
let moves = parseInt(document.querySelector('moves').innerHTML);
let time = document.querySelector('.timer');
let min = 0,sec = 0;
function timestart(){
    setInterval(() => {
        if(sec === 60){
            min++;
            sec =0;
        }
        sec++;
        let displayMin = String(min).padStart(2, '0');
        let displaySec = String(sec).padStart(2, '0');
        time.innerHTML = `${displayMin}:${displaySec}`;
    },1000);
}
// timestart();
// console.log(time);  

const cards = document.querySelectorAll('.btn')

function flipCard(){
    this.classList.toggle('flip');
}

cards.forEach(card => {
    card.addEventListener('click',flipCard);
});