class Word{

	constructor(){
		this.x;
		this.y;

		let wordLen=getRandomInt(1,10);
		this.letters=[];

		this.matchedLen=0;

		this.elem=document.createElement('span');
		this.childs=[];
		for(let i=0;i<wordLen;i++){
			let temp=getRandomInt(0,26);

			this.letters.push(String.fromCharCode(97+temp));

			let child=document.createElement('span');
			child.innerHTML=this.letters[i];
			this.childs.push(child);
			this.elem.appendChild(child);
		}
	}

	draw(){
		this.x=getRandomInt(0,800);
		this.y=0;

		this.elem.style.position='absolute';
		this.elem.style.left=this.x+'px';
		this.elem.style.top=this.y+'px';

		document.getElementById('container').appendChild(this.elem);
	}
	move(){
		this.y++;
		this.elem.style.top=this.y+'px';
	}
	match(c){
		if(this.letters[this.matchedLen]==c){
			this.childs[this.matchedLen].classList.add('highlight');
			this.matchedLen++;
			for(let i=0;i<this.matchedLen;i++){
				if(!this.childs[i].classList.contains('highlight')){
					this.childs[i].classList.add('highlight');
				}
				else{
					break;
				}
			}
			return true;
		}
		else{
			for(let i=0;i<this.matchedLen;i++){
				this.childs[i].classList.remove('highlight');
			}
			return false;
		}
	}
	matchAll(){

		for(let i=0;i<this.matchedLen;i++){
			this.childs[i].classList.add('highlight');
		}
	}
	eraseLastMatch(){
		if(this.matchedLen==0){
			return;
		}
		this.matchedLen--;
		this.childs[this.matchedLen].classList.remove('highlight');
	}
	remove(){
		document.getElementById('container').removeChild(this.elem);
	}
}

let gameThat;
class Game{
	constructor(){
		this.words=[];
		this.matchedWords = [];
		gameThat=this;

		this.input=document.getElementsByTagName('input')[0];
		this.inputTxt = '';
		this.input.value=this.inputTxt;

		this.scoreBoard=document.getElementById('scoreBoard');
    this.score=0;

    this.key2Index = {};
    this.keySpans=[];

  }

	init(){
    this.container=document.getElementById('container');

		this.scoreBoard.innerHTML=this.score;

		document.addEventListener('keydown',this.keyHandler);

		this.gameStart=false;
		this.gameover=false;

		let msgBoard=document.getElementById('msgBoard');

		msgBoard.children[0].innerHTML='Welcome To Typing Tutor';
		msgBoard.children[1].innerHTML=`Press Space to Start`;
    this.drawKeyboard();
	}

	start(){
		let timer=0;

		this.gameInterval=setInterval(function(){
			timer++;
			if(timer>=100 || gameThat.words.length<=0){
				let word=new Word();
				word.draw();
				gameThat.words.push(word);
				timer=0;

				if(gameThat.inputTxt==''){
					gameThat.matchedWords.push(word);
				}
				else{
					let i=0;
					for(;i<gameThat.inputTxt.length;i++){
						if(!word.match(gameThat.inputTxt.charAt(i))){
							break;
						}
					}
					if(i>=gameThat.inputTxt.length){
						gameThat.matchedWords.push(word);
					}
				}
			}
			for(let i=0;i<gameThat.words.length;i++){
				gameThat.words[i].move();
      }
      // console.log(gameThat.container.style);
			if(gameThat.words.length>0 && gameThat.words[0].y>=350){

				gameThat.stop();
			}
		},50);
	}

	stop(){
		clearInterval(gameThat.gameInterval);

		let msgBoard=document.getElementById('msgBoard');
		msgBoard.style.display='block';

		msgBoard.children[0].innerHTML='Game Over';
		msgBoard.children[1].innerHTML=`Your Score is ${gameThat.score} <br><br> Press Space to Restart`;

		gameThat.gameStart=false;
		gameThat.gameover=true;
	}

	resetGame(){
		for(let i=0;i<gameThat.words.length;i++){
			gameThat.words[i].remove();
		}
		game=new Game();
		game.init();
	}

  changeColorKey(key){
    var index = this.key2Index[key];
    gameThat.keySpans[index].style.background =gameThat.randomColor();
    setTimeout(function () {
        gameThat.keySpans[index].style.backgroundColor = '#eaeaea';
    }, 100);
  }

  randomColor(){
    return 'rgb('+Math.floor(Math.random()*256)
        +','+Math.floor(Math.random()*256)
        +','+Math.floor(Math.random()*256)+')';
  }

	keyHandler(event){
		if(!gameThat.gameover && !gameThat.gameStart && event.keyCode==32){
			gameThat.gameStart=true;
			gameThat.start();

			document.getElementById('msgBoard').style.display='none';
			return;
		}
		else if(gameThat.gameover && event.keyCode==32){
			gameThat.resetGame();
    }
    else if(!gameThat.gameStart){
      return;
    }
		let char;
		if (event.keyCode >= 65 && event.keyCode <= 90) {
		    // Alphabet upper case
        char=String.fromCharCode(97+(event.keyCode-65));
        gameThat.changeColorKey(char)
		} else if (event.keyCode >= 97 && event.keyCode <= 122) {
		    // Alphabet lower case
        char = String.fromCharCode(event.keyCode);
        gameThat.changeColorKey(char);
		}

		if(char){
			gameThat.inputTxt+=char;
			gameThat.input.value= gameThat.inputTxt;

			let matched=false;

			gameThat.matchedWords=gameThat.matchedWords.filter(function(val){
				let match;
				match=val.match(char);
				if(val.matchedLen>=val.letters.length){
					match=false;
					let index=gameThat.words.indexOf(val);
					val.remove();

					gameThat.score++;
					gameThat.updateScore();
					gameThat.words.splice(index,1);

					matched=true;
				}
				return match;
			})
			if(matched){
				gameThat.reset();
			}
		}
		else if(event.keyCode==8){
			gameThat.inputTxt = gameThat.inputTxt.slice(0,-1);
			gameThat.input.value = gameThat.inputTxt;

			gameThat.matchedWords.forEach(function(item,index){
				item.eraseLastMatch();
			});

			var txtLen=gameThat.inputTxt.length;
			for(let i=0;i<gameThat.words.length;i++){
				if(gameThat.matchedWords.indexOf(gameThat.words[i])==-1){

					if(gameThat.words[i].matchedLen==txtLen){
						gameThat.words[i].matchAll();
						gameThat.matchedWords.push(gameThat.words[i]);
					}
				}
			}
		}
	}
  drawKeyboard() {
    let keyboard=[];
    keyboard.push(document.getElementById('keyboard1'));
    keyboard.push(document.getElementById('keyboard2'));
    keyboard.push(document.getElementById('keyboard3'));

    for(let i=0;i<keyboard.length;i++){
      keyboard[i].innerHTML='';
    }

    let character = "qwertyuiopasdfghjklzxcvbnm";
    let charArray = character.split("");
    this.key2Index = {};
    this.keySpans=[];

    let limit=9;
    let currentIndex=0;
    for (let i = 0; i < charArray.length; i++) {
        let keySpan = document.createElement('span');
        keySpan.innerHTML = charArray[i];
        keyboard[currentIndex].appendChild(keySpan);
        this.key2Index[charArray[i]]=i;
        this.keySpans.push(keySpan);

        if(i>=limit){
          limit+=limit;
          console.log(limit,currentIndex);
          currentIndex++;
          console.log(keyboard[currentIndex],keyboard)
        }
    }
    // container.appendChild(keyboard);
  }
	reset(){
		gameThat.inputTxt='';
		gameThat.input.value=gameThat.inputTxt;
		gameThat.matchedWords=[];
		console.log(gameThat.words.length);
		for(let i=0;i<gameThat.words.length;i++){
			while(gameThat.words[i].matchedLen>0){
				gameThat.words[i].eraseLastMatch();
			}
			gameThat.matchedWords.push(gameThat.words[i]);
		}
	}

	updateScore(){
		this.scoreBoard.innerHTML=this.score;
	}

}

var game=new Game();
game.init();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
