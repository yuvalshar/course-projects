let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let isDrawing = false;
let drawColor = "black";
let drawWidth = "2";
let restoreArray = [];
let backupArray = [] ;
let index = -1;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);
// console.log("restoreArray: " + restoreArray);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);
fix_dpi();

updateCanvasSize();
window.onresize = saveData();

function saveData(){
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    updateCanvasSize();
    ctx.putImageData(imgData, 0, 0);
    // getImageData();
    // putImageData();
}
updateCanvasSize();

function start(pEvent) {
    console.log("start");
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(pEvent.clientX - canvas.getBoundingClientRect().left,
            pEvent.clientY - canvas.getBoundingClientRect().top);
}

function draw(pEvent) {
    console.log("draw");
    if(isDrawing) {
        console.log("isDrawing");
        ctx.lineTo(pEvent.clientX - canvas.getBoundingClientRect().left,
        pEvent.clientY - canvas.getBoundingClientRect().top);
        ctx.strokeStyle = drawColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = drawWidth;
        ctx.stroke();
    }
    
}

function changeColor(pElement) {
    drawColor = pElement.style.background;
}

function updateCanvasSize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth * 0.5;
}

function stopDraw() {
    console.log("stopDraw");
    isDrawing = false;

    restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    backupArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index = index + 1;
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    restoreArray = [];
    index = -1;
}

function undoLast() {
    if(index <= 0){
        clearCanvas();
    }
    else{
        index = index -1;
        restoreArray.pop();
        ctx.putImageData(restoreArray[index], 0, 0);
    }
    
}

function reduLast() {
    if(index <= 0){
        backupArray.pop();
    }
    else{
        index = index +1;
        backupArray.pop();
        ctx.putImageData(backupArray[index], 0, 0);
    }
}

function saveImage(){
    let imageName = prompt("Please choos a name for your painting", "My paint");
    let dataURL = canvas.toDataURL("images/png");
    console.log("dataURL: " + dataURL);
    let downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = imageName;
    downloadLink.click();
    downloadLink.delete;
}