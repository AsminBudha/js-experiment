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
			// this.matchedLen--;
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
	}

	init(){
		let timer=0;
		
		this.scoreBoard.innerHTML=this.score;

		document.addEventListener('keydown',this.keyHandler);

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
			if(gameThat.words.length>0 && gameThat.words[0].y>=500){
				clearInterval(gameThat.gameInterval);
				gameThat.words[0].remove();
				gameThat.words.shift();

			}
		},50);
	}

	keyHandler(event){
		let char;
		if (event.keyCode >= 65 && event.keyCode <= 90) {
		    // Alphabet upper case
		    char=String.fromCharCode(97+(event.keyCode-65));
		} else if (event.keyCode >= 97 && event.keyCode <= 122) {
		    // Alphabet lower case
		    char = String.fromCharCode(event.keyCode);
		}

		if(char){
			gameThat.inputTxt+=char;
			gameThat.input.value= gameThat.inputTxt;

			let matched=false;

			gameThat.matchedWords=gameThat.matchedWords.filter(function(val){
				let match;
				// if(gameThat.inputTxt=='') return true; 
				match=val.match(char);
				if(val.matchedLen>=val.letters.length){
					match=false;
					let index=gameThat.words.indexOf(val);
					val.remove();
					
					// gameThat.inputTxt='';

					gameThat.score++;
					gameThat.updateScore();
					gameThat.words.splice(index,1);

					matched=true;
				}
				return match;
			})
			console.log(matched);
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

	reset(){
		console.log('reset');
		gameThat.inputTxt='';
		gameThat.input.value=gameThat.inputTxt;
		gameThat.matchedWords=[];
		console.log(gameThat.words.length);
		for(let i=0;i<gameThat.words.length;i++){
			while(gameThat.words[i].matchedLen>0){
				gameThat.words[i].eraseLastMatch();
			}
			console.log(i);
			gameThat.matchedWords.push(gameThat.words[i]);
		}
	}

	updateScore(){
		this.scoreBoard.innerHTML=this.score;
	}

}

(new Game()).init();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
