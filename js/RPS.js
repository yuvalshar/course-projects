let rockDiv = document.getElementById("rockDiv");
let paperDiv = document.getElementById("paperDiv");
let scissorsDiv = document.getElementById("scissorsDiv");
let userScoreSpan = document.getElementById("userScore");
let computerScoreSpan = document.getElementById("computerScore");
let options = ["rock", "paper","scissors"];
let userScore = 0;
let computerScore = 0;
let messageDiv = document.getElementById("message");
let gameRound = 0;
let elemUser = document.createElement("img");
let elemComputer = document.createElement("img");

rockDiv.addEventListener("mouseover", hoverIsOn);
rockDiv.addEventListener("mouseout", hoverIsOff);
paperDiv.addEventListener("mouseover", hoverIsOn);
paperDiv.addEventListener("mouseout", hoverIsOff);
scissorsDiv.addEventListener("mouseover", hoverIsOn);
scissorsDiv.addEventListener("mouseout", hoverIsOff);

rockDiv.addEventListener("mousedown", function(){startGame("rock")});
paperDiv.addEventListener("mousedown", function(){startGame("paper")});
scissorsDiv.addEventListener("mousedown", function(){startGame("scissors")});

function hoverIsOn(pEvent) {
    if(pEvent.target.className == "rps"){
        pEvent.target.style.background = "black";
        pEvent.target.style.transition = "0.86s";
        pEvent.target.style.cursor = "pointer";
        pEvent.target.style.border = "6px";
        pEvent.target.style.borderColor = "yellow";
    }
}

function hoverIsOff(pEvent) {
    if(pEvent.target.className == "rps"){
        pEvent.target.style.background = "transparent";
        pEvent.target.style.border = "2px solid black";
    }
}

function startGame(pUserSelection){
    let userChoise = pUserSelection;
    console.log("user:" + userChoise)
    showSelection("userChoiceIcon", userChoise, elemUser);

    let randomNumber = Math.floor(Math.random() * 3);
    console.log("randomNumber: " + randomNumber)

    let computerChoise = options[randomNumber];
    console.log("Computer: " + computerChoise);
    showSelection("computerChoiceIcon", computerChoise, elemComputer);
    
    rockPaperScissors(userChoise, computerChoise);
}

function rockPaperScissors(puserChoise, pcomputerChoise) {
    gameRound = gameRound + 1;
    let result = puserChoise + pcomputerChoise;
    if (gameRound == 3){
        if(userScore > computerScore){
            messageDiv.textContent = "Great Job. You Won!";
            messageDiv.style.color = "Blue";
        }
        if(userScore > computerScore){
            messageDiv.textContent = "Not so bad. Try again";
            messageDiv.style.color = "orange";
    }
         if(userScore > computerScore){
            messageDiv.textContent = "Turns out, it's a draw...";
            messageDiv.style.color = "red"
         }
    }
    else{
        if (result == "rockrock" || result == "paperpaper" || result == "scissorsscissors"){
            console.log("Turns out, it's a draw...")
            messageDiv.textContent = "Turns out, it's a draw...";
            messageDiv.style.color = "red";

        }
    
        if (result == "rockscissors" || result == "scissorspaper" ||result == "paperrock"){
            console.log("You Won");
            messageDiv.textContent = "Great Job. You Won!";
            messageDiv.style.color = "Blue"
    
            userScore = userScore + 1;
            userScoreSpan.textContent = userScore;
            // document.getElementById("messageUser").style.visibility = "visible";
            // document.getElementById("messageComputer").style.visibility = "hidden";
            // document.getElementById("messageDraw").style.visibility = "hidden";
        }
    
        if (result == "scissorsrock" || result == "paperscissors" ||result == "rockpaper"){
            console.log("You Lost");
            messageDiv.textContent = "Not so bad. Try again";
            messageDiv.style.color = "orange"
    
            computerScore = computerScore + 1;
            computerScoreSpan.textContent = computerScore;
            // document.getElementById("messageComputer").style.visibility = "visible";
            // document.getElementById("messageUser").style.visibility = "hidden";
            // document.getElementById("messageDraw").style.visibility = "hidden";
     
         }
     }

}

function showSelection(pDivChiceIcon, pImgName, pElem) {
    pElem.setAttribute("src", "images/" +     pImgName + ".png");
    pElem.setAttribute("height", "40");
    pElem.setAttribute("width", "40");
    pElem.setAttribute("pading", "0");

    document.getElementById(pDivChiceIcon).appendChild(pElem);
}