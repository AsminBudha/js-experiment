const GAP=200;
const CONTAINER_HEIGHT=600;
const CONTAINER_WIDTH=1300;

var gameTHAT=null;
var birdTHAT=null;

class Bird{

	constructor(){
		this.x=100;
		this.y=300;
		this.height=35;
		this.width=44;
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
		this.elem.style.background='url(\'bird.png\') 0px 0px';


		document.getElementById('container').appendChild(this.elem);
	}

	update(){
		if(this.down==-1){
			this.y-=2;
		}
		else
			this.y+=this.down;
		this.elem.style.top=this.y+'px';

	}

	changeBirdMove(position){
		this.elem.style.backgroundPosition=`0px -${this.height*position}px`;
	}
	remove(){
		document.getElementById('container').removeChild(this.elem);
	}
}

class Pipe{
	constructor(min,max){
		this.y=getRandomInt(min,CONTAINER_HEIGHT-GAP-max);
		this.width=50;
		this.container=document.getElementById('container');
		this.draw();
		
	}

	draw(){
		this.elemTop=document.createElement('div');
		// this.elemTop.classList.add('top');
		this.elemTop.style.background='url(pipe-down.png)';
		this.elemTop.style.backgroundSize='100% 100%';
		this.elemTop.style.position='absolute';
		this.elemTop.style.top='0px';
		this.elemTop.style.height=(this.y-30)+'px';
		this.elemTop.style.width=this.width+'px';
		this.elemTop.style.left='1300px';
		
		this.elemTopHead = document.createElement('div');
		this.elemTopHead.style.background='url(pipe-up.png)';
		this.elemTopHead.style.backgroundSize='100% 100%';
		this.elemTopHead.style.position='absolute';
		this.elemTopHead.style.top=(this.y-30)+'px';
		this.elemTopHead.style.height='30px';
		this.elemTopHead.style.width=this.width+20+'px';
		this.elemTopHead.style.left='1290px';
		

		this.elemBottomHead=document.createElement('div');
		this.elemBottomHead.style.background='url(pipe-down.png)';
		this.elemBottomHead.style.backgroundSize='100% 100%';
		this.elemBottomHead.style.position='absolute';
		this.elemBottomHead.style.top=this.y+GAP+'px';
		this.elemBottomHead.style.height='30px';
		this.elemBottomHead.style.width=this.width+20+'px';
		this.elemBottomHead.style.left='1290px';

		this.elemBottom=document.createElement('div');
		this.elemBottom.style.background='url(pipe-down.png)';
		this.elemBottom.style.backgroundSize='100% 100%';
		this.elemBottom.style.position='absolute';
		this.elemBottom.style.top=this.y+GAP+30+'px';
		this.elemBottom.style.height=CONTAINER_HEIGHT-30-(this.y+GAP)+'px';
		this.elemBottom.style.width=this.width+'px';
		this.elemBottom.style.left='1300px';

 
		this.container.appendChild(this.elemTop);
		this.container.appendChild(this.elemTopHead);
		this.container.appendChild(this.elemBottomHead);
		this.container.appendChild(this.elemBottom);
	}

	update(){
		let left=parseInt(this.elemTop.style.left);

		this.elemTop.style.left=left-1+'px';
		this.elemTopHead.style.left=left-11+'px';
		this.elemBottomHead.style.left=left-11+'px';
		this.elemBottom.style.left=left-1+'px';

	}

	getY(){
		return this.y;
	}

	getX(){
		return parseInt(this.elemTopHead.style.left);
	}

	remove(){
		this.container.removeChild(this.elemTop);
		this.container.removeChild(this.elemTopHead);
		this.container.removeChild(this.elemBottomHead);
		this.container.removeChild(this.elemBottom);
	}
}

class Game{
	constructor(){
		this.bird=new Bird();
		this.pipes=[];
		gameTHAT=this;

		this.score=0;

	}

	init(){
		this.gameStart=false;
		this.gameOver=false;

		document.addEventListener('keydown',this.keyHandler);

		this.msgBoard=document.getElementById('msgBoard');

		this.msgBoard.children[0].innerHTML='Welcome To Flappy World';
		this.msgBoard.children[1].innerHTML='Press Space To Start Game';

		this.scoreBoard=document.getElementById('scoreBoard');
		this.scoreBoard.innerHTML=this.score;
		
	}
	keyHandler(event){
		if(!gameTHAT.gameOver && !gameTHAT.gameStart && event.keyCode==32){		
			gameTHAT.gameStart=true;
			gameTHAT.start();	
			gameTHAT.msgBoard.style.display='none';
		}
		else if(gameTHAT.gameOver && event.keyCode==32){
			gameTHAT.bird.remove();
			while(gameTHAT.pipes.length>0){
				gameTHAT.pipes[0].remove();
				gameTHAT.pipes.shift();
			}

			game=new Game();
			
			game.init();
		}
		else if(!gameTHAT.gameOver && gameTHAT.gameStart && event.keyCode==32){

			gameTHAT.bird.down=-1;
			gameTHAT.isBirdUp=1;
		}
	}
	start(){
		let tick=0;
		let curMin=0,curMax=20;
		
		this.isBirdUp=0;

		let pipePointer=0;

		let birdMovePointer=0;

		this.gameInterval=setInterval(function(){
			
			for(let i=0;i<gameTHAT.pipes.length;i++){
				gameTHAT.pipes[i].update();

			}

			//Check collision with pipes;
			if(gameTHAT.pipes.length>pipePointer
				&& (gameTHAT.bird.x+gameTHAT.bird.width>= gameTHAT.pipes[pipePointer].getX() 
					&& gameTHAT.bird.x<=gameTHAT.pipes[pipePointer].getX()+gameTHAT.pipes[pipePointer].width) 
				&& (gameTHAT.bird.y<=gameTHAT.pipes[pipePointer].y 
					|| gameTHAT.bird.y+gameTHAT.bird.height>=gameTHAT.pipes[pipePointer].y+GAP)){
				
				gameTHAT.stop();
			}

			if(gameTHAT.pipes.length>pipePointer && gameTHAT.pipes[pipePointer].getX()+20<gameTHAT.bird.x){
				
				pipePointer++;

				gameTHAT.score++;
				gameTHAT.scoreBoard.innerHTML=gameTHAT.score;
			}
			if(gameTHAT.pipes.length>0 && gameTHAT.pipes[0].getX()+20<0){

				gameTHAT.pipes[0].remove();
				gameTHAT.pipes.shift();

				pipePointer--;
			}
			
			//Checks when to insert new pipe
			tick++;
			if(tick>=200 || gameTHAT.pipes.length==0){
				tick=0;

				let p=new Pipe(curMin,curMax);
				gameTHAT.pipes.push(p);

				//New Range for pipe to generate
				curMin=p.getY()-100;
				curMin=Math.max(curMin,0);

				curMax=p.getY()+200;
				curMax=Math.min(curMax,CONTAINER_HEIGHT-GAP-50);
			}

			//Change sprite of bird movement
			if(tick%10==0){
				gameTHAT.bird.changeBirdMove(birdMovePointer);

				birdMovePointer=(birdMovePointer+1)%4;
			}

			//Check collision with container else update bird position
			if(gameTHAT.bird.y+gameTHAT.bird.height>=CONTAINER_HEIGHT
				|| gameTHAT.bird.y<0){
				
				gameTHAT.stop();
			}
			else{
				gameTHAT.bird.update();
			}

			if(gameTHAT.isBirdUp){
				gameTHAT.isBirdUp++;
			}

			if(gameTHAT.isBirdUp>=20){
				gameTHAT.bird.down=1;
				gameTHAT.isBirdUp=0;
			}

		},10);
	}

	stop(){
		this.gameStart=false;
		this.gameOver=true;
		clearInterval(this.gameInterval);

		this.msgBoard.children[0].innerHTML='Game Over';
		this.msgBoard.children[1].innerHTML=`Your score is ${this.score} <br> Press Space To Restart`;
		this.msgBoard.style.display='block';
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var game=new Game();
game.init();