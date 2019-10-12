import { stageCollision, tilesCollision } from "./lib/collision.js";
//capturar tag
let content = document.getElementById('content');
content.innerHTML= `<div class="box">Canvas title</div>`;

//capturar canvas
let canvas = document.getElementById('canvas');
canvas.setAttribute("width", "256");
canvas.setAttribute("height", "256");
canvas.style.border = "1px dashed black";
canvas.style.background = "#000";
//capturar contexto 2d
let ctx = canvas.getContext("2d");

//vars 
let x = 35;
let y = 35;
let speedX = 0;
let speedY = 0;
let charWH = 32;
let playerColor = "#27ae60";
//disenhar bg
let bgArray2D = [
[1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,1],
[0,0,0,0,0,0,0,1],
[0,0,0,0,0,0,0,1],
[1,0,0,0,1,0,0,1],
[1,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1]]

let array1D = bgArray2D.reduce((a,b) => a.concat(b));
let tilesArray = array1D.map((element, i) => {
	let x = (i % 8) * charWH;
	let y = (Math.floor(i / 8)) * charWH;
	return {x: x, y: y, width: charWH, height: charWH, value: element};
});
drawBG();
//disenhar Char
drawChar();

//add listener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
//GameLoop
gameLoop();
function gameLoop() {
	requestAnimationFrame(gameLoop);
	//clear screen
	//clearRect: x,y, width screen, height screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//update player position
	x += speedX;
	y += speedY;
	//collision
	let collision1 = stageCollision( { x: x, y: y, width: charWH, height: charWH }, { width: canvas.width, height: canvas.height });
	if (collision1 !== "") {
		x += -speedX;
		y += -speedY;
		speedX = 0;
		speedY = 0;
	}
	let collision2 = tilesCollision( { x: x, y: y, width: charWH, height: charWH }, tilesArray );
	if (collision2) {
		x += -speedX;
		y += -speedY;
		speedX = 0;
		speedY = 0;
	}
	//update view
	drawBG();
	drawChar();
}

function onKeyDown(event) {
	if (event.keyCode == 68) {
		speedX = 5;
		playerColor = "#27ae60";
	} else if (event.keyCode == 65) {
		speedX = -5;
		playerColor = "#27ae60";
	} else if (event.keyCode == 87){
		speedY = -5;
		playerColor = "#27ae60";
	} else if (event.keyCode == 83) {
		speedY = 5;
		playerColor = "#27ae60";
	}	
}
function onKeyUp(event) {
	speedX = 0;
	speedY = 0;
}
function drawBG() {

	array1D.forEach((element, i) => {
		if (element == 1) {
			let x = (i % 8) * 32;
			let y = (Math.floor(i / 8)) * 32;
			ctx.beginPath();
			ctx.fillStyle = "#778899";
			ctx.rect(x,y,32,32);
			ctx.fill();
		} else {
			let x = (i % 8) * 32;
			let y = (Math.floor(i / 8)) * 32;
			ctx.beginPath();
			ctx.fillStyle = "#CCC";
			ctx.rect(x,y,32,32);
			ctx.fill();
		}
	})
}
function drawChar() {

	//update screen
	ctx.beginPath();
	ctx.fillStyle = playerColor;
	//params: x,y, width, heigth
	ctx.rect(x, y, charWH, charWH);
	ctx.fill();
}
