let score = 0;
let scoreBoard = document.getElementById("scoreBoard");
let restartButton = document.getElementById("playAgain");
let iPhoneClick = 0; 
let SamsungClick = 0;
let vision = document.getElementById("appleVisionPro");
let yellowBalloons = document.getElementsByClassName("iPhoneClick");
let balloonsGallery = document.getElementById("balloonsGallery");

document.addEventListener('mousedown', startGame);
restartButton.addEventListener('mousedown', restart);
vision.addEventListener('mousedown', visionClicked);

function startGame(pEvent) {
    if (pEvent.target.className == "iPhone") {
        pEvent.target.style.visibility = "hidden";
        score = score + 1;
        scoreBoard.textContent = score;
        iPhoneClick = iPhoneClick + 1;
    } else if (pEvent.target.className == "Samsung") {
        pEvent.target.style.visibility = "hidden";
        score = score - 1;
        scoreBoard.textContent = score;
        SamsungClick = SamsungClick + 1;
        alert ("You shold click on the iPhone")
    } 
    endGame();
}

function restart() {
    location.reload();
}

function endGame() {
    if (iPhoneClick == 6) {
        iPhonesGallery.textContent = "Well done! You won";
        iPhonesGallery.style.backgroundColor = "aqua";
    }
    if (SamsungClick == 3) {
        iPhonesGallery.textContent = "Try Again";
        iPhonesGallery.style.backgroundColor = "red";
    }
}

function visionClicked() {
    alert('"We are Presnting, the Apple Vision Pro", Tim Cook')
}