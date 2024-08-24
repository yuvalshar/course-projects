const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const GAME_OVER_IMG_WIDTH = 1198;
const GAME_OVER_IMG_HEIGHT = 700;
const GAME_OVER_IMG = new Image();
GAME_OVER_IMG.src = "./images/collector/appleGameOver.png";
const BG_IMG = new Image();
BG_IMG.src = "./images/collector/azrieli.jpeg";
var userName = prompt("Hello, my name is Yuval. What's your name?");

const PLAYER = {
    img: new Image(),
    x: 200,
    y: 200,
    width: 25,
    height: 45,
    enlarge: 2.5,
    face: {
        "up": "./images/collector/yuki/up.png",
        "down": "./images/collector/yuki/down.png",
        "left": "./images/collector/yuki/left.png",
        "right": "./images/collector/yuki/right.png",
    },
    speed: 10,
};
PLAYER.img.src = PLAYER.face["down"];

const KEYS = {
    "ArrowUp" : false,
    "ArrowDown" : false,
    "ArrowRight" : false,
    "ArrowLeft" : false,
};

updateCanvasSize();  
window.onresize = updateCanvasSize();

let gameOverImgX = CANVAS.width / 2 - GAME_OVER_IMG_WIDTH / 2;
let gameOverImgY = CANVAS.height / - GAME_OVER_IMG_HEIGHT / 2;
let time = 100;
let gameOn = true;
let score = 0;

let pokemon1 = new Figure(CTX, "./images/collector/pokemons/pokemon1.png", "picachu", 0.4, 4.5);
let pokemon2 = new Figure(CTX, "./images/collector/pokemons/pokemon2.png", "giglipah", 0.25, 6);
let pokemon3 = new Figure(CTX, "./images/collector/pokemons/pokemon3.png", "balbazaur", 0.8, 3);
let bomb1 = new Figure(CTX, "./images/collector/bomb.png", "bomb", 0.1);
let bomb2 = new Figure(CTX, "./images/collector/bomb.png", "Balistic Bomb", 0.25);
let pokemonsGroup = [pokemon1, pokemon2, pokemon3];
let bombsGroup = [bomb1, bomb2];

document.addEventListener("keydown", addKey);
document.addEventListener("keyup", removeKey);

function updateCanvasSize() {
    CANVAS.width = CANVAS.clientWidth;
    CANVAS.height = CANVAS.clientWidth * 0.5;
}

function writeText(text = "TEXT", color = "black", size = "30", font = "Arial", style = "", x = CANVAS.width / 2, y = CANVAS.height / 2) {
    CTX.font = style + " " + size + "px " + font;
    CTX.fillStyle = color;
    CTX.fillText(text, x, y);
}

function gameLoop() {
    if (gameOn === true) {
        // CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        CTX.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height);
        writeText("Time: " + time, "black", 50, "Arial", "bold", 1000, 70);
        writeText("Hello " + userName, "aqua", 50, "Arial", "bold", 24, 70);
        writeText("Score: " + score, "black", 50, "Arial", "bold", 980, 120);
        drawFigure(PLAYER);
        controlPlayerMove();
        for (let i = 0; i < pokemonsGroup.length; i++) {
            pokemonsGroup[i].draw();
            pokemonsGroup[i].moveToRandomLoc();

            if(checkCollision(PLAYER, pokemonsGroup[i])){   
                pokemonsGroup[i].jumpToRandomLoc();
                score++;
            }
        }

        for (let n = 0; n < bombsGroup.length; n++) {
            bombsGroup[n].draw();
            bombsGroup[n].moveToRandomLoc();

            if(checkCollision(PLAYER, bombsGroup[n])){   
                bombsGroup[n].jumpToRandomLoc();
                score--;
            }
           
        }
        // pokemon1.draw();
        // pokemon2.draw();
        // pokemon3.draw();
        // bomb1.draw();
        // bomb2.draw();
        // timer();
        // setTimeout(function() {requestAnimationFrame(gameLoop);}, 1000);
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

setInterval(timer, 1000);

function timer() {
    if (time > 0){
        time--;
    }
    else{
        gameOver();
        writeText("Your score is " + score, "Blue", 50, undefined, "bold", 420, 80);
        writeText("Press r to reload the game", "Green", 50, undefined, "bold", 323, 600);
    }
}

function reloadTheGame(pEvent){
    document.addEventListener("keydown", function(event) {
        if (event.key == "r" || event.key == "R" || event.key == "ר") {
            location.reload();
        }
    });
}


reloadTheGame();


function addKey(pEvent){
    KEYS[pEvent.key] = true;
}

function removeKey(pEvent){
    KEYS[pEvent.key] = false;
    PLAYER.img.src = PLAYER.face["down"];
}

function controlPlayerMove() {
    if(KEYS["ArrowUp"] === true && PLAYER.y > 0) {
        PLAYER.y = PLAYER.y - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["up"];
    }

    if (KEYS["ArrowLeft"] === true && PLAYER.x > 0) {
        PLAYER.x = PLAYER.x - PLAYER.speed;
        PLAYER.img.src = PLAYER.face["left"];
    }

    if (KEYS["ArrowDown"] === true && PLAYER.y < (CANVAS.height - PLAYER.height * PLAYER.enlarge)) {
        PLAYER.y = PLAYER.y + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["down"];
    }

    if (KEYS["ArrowRight"] === true && PLAYER.x < (CANVAS.width - PLAYER.width * PLAYER.enlarge)) {
        PLAYER.x = PLAYER.x + PLAYER.speed;
        PLAYER.img.src = PLAYER.face["right"];
    }
    
}

function gameOver() {
    clearInterval(timer, 1000);
    gameOn = false;
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(GAME_OVER_IMG, gameOverImgX, gameOverImgY, GAME_OVER_IMG_WIDTH, GAME_OVER_IMG_HEIGHT);   
}
