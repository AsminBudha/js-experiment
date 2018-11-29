const GAP=100;
const CONTAINER_HEIGHT=600;
const CONTAINER_WIDTH=1300;

var gameTHAT=null;
var birdTHAT=null;

class Bird{

	constructor(){
		this.x=100;
		this.y=300;
		this.height=10;
		this.width=10;
		this.down=1;
		birdTHAT=this;

		this.draw();
	}

	draw(){
		this.elem=document.createElement('div');
		this.elem.style.background='red';
		this.elem.style.height=this.height+'px';
		this.elem.style.width=this.width+'px';
		this.elem.style.position='absolute';
		this.elem.style.top=this.y+'px';
		this.elem.style.left=this.x+'px';
		this.elem.style.zIndex='2';

		document.getElementById('container').appendChild(this.elem);
	}

	update(){
		this.y+=this.down;
		// let x=parseInt(this.elem.style.left)+1;

		this.elem.style.top=this.y+'px';
		// this.elem.style.left=x+'px';
	}
}

class Pipe{
	constructor(min,max){
		this.y=getRandomInt(min,CONTAINER_HEIGHT-GAP-max);

		this.draw();
	}

	draw(){
		this.elemTop=document.createElement('div');
		this.elemTop.style.background='green';
		this.elemTop.style.position='absolute';
		this.elemTop.style.top='0px';
		this.elemTop.style.height=this.y+'px';
		this.elemTop.style.width='20px';
		this.elemTop.style.left='1300px';

		this.elemBottom=document.createElement('div');
		this.elemBottom.style.background='green';
		this.elemBottom.style.position='absolute';
		this.elemBottom.style.top=this.y+GAP+'px';
		this.elemBottom.style.height=CONTAINER_HEIGHT-(this.y+GAP)+'px';
		this.elemBottom.style.width='20px';
		this.elemBottom.style.left='1300px';

		document.getElementById('container').appendChild(this.elemTop);
		document.getElementById('container').appendChild(this.elemBottom);
	}

	update(){
		let left=parseInt(this.elemTop.style.left);

		this.elemTop.style.left=left-1+'px';
		this.elemBottom.style.left=left-1+'px';
	}

	getY(){
		return this.y;
	}

	getX(){
		return parseInt(this.elemTop.style.left);
	}

	remove(){
		document.getElementById('container').removeChild(this.elemTop);
		document.getElementById('container').removeChild(this.elemBottom);
		
	}
}

class Game{
	constructor(){
		this.bird=new Bird();
		this.pipes=[];
		gameTHAT=this;
	}

	init(){
		
		let tick=0;
		let curMin=0,curMax=20;
		
		let isBirdUp=0;

		let scoreBoard=document.getElementById('scoreBoard');

		document.addEventListener('keydown', (event) => {
			if(event.keyCode==32){
				gameTHAT.bird.down=-1;
				// console.log('SPace');
				isBirdUp=1;	
			}
		});
		
		let pipePointer=0;

		let score=0;

		gameInterval=setInterval(function(){
			for(let i=0;i<gameTHAT.pipes.length;i++){
				gameTHAT.pipes[i].update();

			}

			if(gameTHAT.pipes.length>pipePointer
				&& (gameTHAT.bird.x+gameTHAT.bird.width>= gameTHAT.pipes[pipePointer].getX() 
					&& gameTHAT.bird.x+gameTHAT.bird.width<=gameTHAT.pipes[pipePointer].getX()+20) 
				&& (gameTHAT.bird.y<=gameTHAT.pipes[pipePointer].y 
					|| gameTHAT.bird.y+gameTHAT.bird.height>=gameTHAT.pipes[pipePointer].y+GAP)){
				// console.log('I am here');
				clearInterval(gameInterval);
			}

			if(gameTHAT.pipes.length>pipePointer && gameTHAT.pipes[pipePointer].getX()+20<gameTHAT.bird.x){
				
				pipePointer++;

				score++;
				scoreBoard.innerHTML=score;
				console.log(score);
			}
			if(gameTHAT.pipes.length>0 && gameTHAT.pipes[0].getX()+20<0){

				gameTHAT.pipes[0].remove();
				gameTHAT.pipes.shift();

				pipePointer--;
			}
			tick++;
			if(tick>=200){
				tick=0;

				let p=new Pipe(curMin,curMax);
				gameTHAT.pipes.push(p);
				curMin=p.getY()-100;
				curMax=Math.max(curMin,0);

				curMax=p.getY()+GAP+100;
				curMax=Math.min(curMax,CONTAINER_HEIGHT-GAP-50);
			}

			if(gameTHAT.bird.y+gameTHAT.bird.height<CONTAINER_HEIGHT){

				gameTHAT.bird.update();	
			}
			else{
				clearInterval(gameInterval);
			}

			if(isBirdUp){
				isBirdUp++;
			}

			if(isBirdUp>=20){
				gameTHAT.bird.down=1;
				isBirdUp=0;
			}

		},10);
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var gameInterval;
(new Game()).init();