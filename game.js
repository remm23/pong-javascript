"use strict";

const canvasArea = {width : 800, height : 600};

const keyboard = {keyDown : -1};

const keys = {A : 65, Z : 90};

const audio = new Audio();
audio.src = "music/background-music.mp3";
audio.loop = true;
//audio.play();

function handleKeyUp(e){
	keyboard.keyDown = -1;
};

function handleKeyDown(e){
	keyboard.keyDown = e.keyCode;
//  console.log(e);
};

const player = {
	pos : {x : 50, y : canvasArea.height / 2 - 50},
	size : {x : 20, y : 100},
	update : () => {
		if(keyboard.keyDown === keys.A && player.pos.y > 0){
			player.pos.y -= 10;
		}
		if(keyboard.keyDown === keys.Z && player.pos.y + player.size.y < Game.canvas.height){
			player.pos.y += 10;
		}
//    console.log("position" + player.pos.x + " " + player.pos.y);
//    console.log("size" + player.size.x + " " +  player.size.y);
	}
};

const ai = {
	pos : {x : 750 - 20, y : canvasArea.height / 2 - 50},
	size : {x : 20 , y : 100},
	speed : 10,
	update : () =>{
		//Movment for the ai
		if(ball.pos.y > ai.pos.y){
			ai.pos.y += ai.speed;
		}
		if(ball.pos.y < (ai.pos.y + (ai.size.y / 2))){
			ai.pos.y -= ai.speed;
		}
	}
};

const ball = {
	pos : {x : 400, y: 300},
	size : {x : 20, y : 20},
	speed : {x : 10, y : 10},
	update : () =>{
    	//Wall Collision
		if( ball.pos.x< 0 || ball.pos.x > (Game.canvas.width - ball.size.x)){ ball.speed.x = -ball.speed.x};
		if( ball.pos.y< 0 || ball.pos.y > (Game.canvas.height - ball.size.y)){ ball.speed.y = -ball.speed.y};
		
		//Player Collision
		if(ball.pos.x < player.pos.x + player.size.x){
			if(ball.pos.y > player.pos.y && ball.pos.y < (player.pos.y + player.size.y)){
				ball.speed.x = -ball.speed.x;
//				console.log("player");
			}
		}
		
		//AI Collision
		if(ball.pos.x > ai.pos.x - ai.size.x){
			if(ball.pos.y > ai.pos.y && ball.pos.y < (ai.pos.y + ai.size.y)){
				ball.speed.x = -ball.speed.x;
			}
		}
		ball.pos.x += ball.speed.x; 
		ball.pos.y += ball.speed.y;
		//    console.log("ball" + ball.pos.x + " " + ball.pos.y);
  }
};

const Game = {
	canvas : undefined,
	ctx : undefined
};

Game.start = () => {
	Game.canvas = document.getElementById('canvas');
	Game.canvas.width = canvasArea.width;
	Game.canvas.height = canvasArea.height;
	Game.ctx = Game.canvas.getContext('2d');
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	window.setTimeout(Game.mainLoop,500);
};

document.addEventListener('DOMContentLoaded',Game.start);

Game.clearCanvas = () => {
  Game.ctx.clearRect(0,0,canvas.width,canvas.height);
};

Game.update = () => {
	ball.update();
	player.update();
	ai.update();
};

Game.draw = () => {
	Game.ctx.fillStyle = "black";
	Game.ctx.fillRect(0,0,Game.canvas.width,Game.canvas.height);

	Game.ctx.fillStyle = "white";
	Game.ctx.fillRect(player.pos.x, player.pos.y, player.size.x, player.size.y);

	Game.ctx.fillStyle = "white";
	Game.ctx.fillRect(ai.pos.x, ai.pos.y, ai.size.x, ai.size.y);

	Game.ctx.fillStyle = "white";
	Game.ctx.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
};

Game.mainLoop = () =>{
	Game.clearCanvas();
	Game.update();
	Game.draw();
	window.setTimeout(Game.mainLoop,1000/60);
};