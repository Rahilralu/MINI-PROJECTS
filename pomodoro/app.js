let min = 25;
let sec = 0;
let interval = null;



function timerstart() {
    const time = document.querySelector('#timer');
    if (interval !== null) {
        return;
    }
    interval = setInterval(() => {
        // Format with leading zeros (e.g., 04:09)
        let displayMin = String(min).padStart(2, '0');
        let displaySec = String(sec).padStart(2, '0');
        time.innerHTML = `${displayMin}:${displaySec}`;

        if (min === 0 && sec === 0) {
            clearInterval(interval);
            return;
        }
        if (sec === 0) {
            min--;
            sec = 59;
        }
        else {
            sec--;
        }
    }, 1000);
}
function pause() {
    clearInterval(interval);
    interval = null;
}

function play() {
    if (interval === null) {
        timerstart();
    }
}

function retry() {
    min = 25;
    sec = 0;
    timerstart();
}

let themeToggle = false;

function toggle() {
    const bg = document.querySelector('.background');
    const toggleImg = document.querySelector('.toggle');
    themeToggle = !themeToggle;

    if (themeToggle) {
        bg.style.backgroundImage = "url('Images/bg2.jpg')";
        toggleImg.style.transform = 'rotate(180deg)';
    }
    else {
        bg.style.backgroundImage = "url('Images/bg1.jpg')";
        toggleImg.style.transform = 'rotate(0deg)';
    }
}

let edaeda = false;
// const audio = new Audio("audios/edaeda.mp3");
function eda() {
    let audio1 = document.querySelector('.light');
    edaeda = !edaeda;
    // audio1.loop() = true;
    if (edaeda) {
        audio1.play();
    }
    else {
        audio1.pause();
    }
}

let rainy = false;

function rain() {
    let audio2 = document.querySelector('.raining');
    rainy = !rainy;
    //   audio2.loop = true;
    if (rainy) {
        audio2.play();

    }
    else {
        audio2.pause();
    }
}

let lala = false;

function lalala() {
    let audio3 = document.querySelector('.la');
    lala = !lala;
    //   audio2.loop = true;
    if (lala) {
        audio3.play();

    }
    else {
        audio3.pause();
    }
}