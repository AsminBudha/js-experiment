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
		console.log(this.letters[this.matchedLen],c);
		if(this.letters[this.matchedLen]==c){
			this.childs[this.matchedLen].classList.add('highlight');
			this.matchedLen++;
			return true;
		}
		else{
			for(let i=0;i<this.matchedLen;i++){
				this.childs[i].classList.remove('highlight');
			}
			this.matchedLen--;
			return false;
		}
	}
	matchAll(c){
		if(this.letters[this.matchedLen]!=c){
			return false;
		}
		this.matchedLen++;
		for(let i=0;i<this.matchedLen;i++){
			this.childs[i].classList.add('highlight');
		}
	}
	eraseLastMatch(){
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
		this.matchedIndexes = [];
		gameThat=this;

		this.input=document.getElementsByTagName('input')[0];
		this.inputTxt = '';
		this.input.value=this.inputTxt;
	}

	init(){
		let timer=0;
		
		document.addEventListener('keydown',this.keyHandler);

		this.gameInterval=setInterval(function(){
			timer++;
			if(timer>=100 || gameThat.words.length<=0){
				let word=new Word();
				word.draw();
				gameThat.words.push(word);
				timer=0;

				if(gameThat.inputTxt==''){
					gameThat.matchedIndexes.push(gameThat.words.length-1);
				}
				else{
					for(let i=0;i<gameThat.inputTxt.length;i++){
						if(!word.match(gameThat.inputTxt.charAt(i))){
							break;
						}
					}
				}
			}
			for(let i=0;i<gameThat.words.length;i++){
				gameThat.words[i].move();
			}
			if(gameThat.words.length>0 && gameThat.words[0].y>=500){
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

			gameThat.matchedIndexes=gameThat.matchedIndexes.filter(function(val){
				return gameThat.words[val].match(char);
			})
		}
		else if(event.keyCode==8){
			gameThat.inputTxt = gameThat.inputTxt.slice(0,-1);
			gameThat.input.value = gameThat.inputTxt;

			gameThat.matchedIndexes.forEach(function(item,index){
				gameThat.words[item].eraseLastMatch();
			});
			
			var txtLen=gameThat.inputTxt.length;
			for(let i=0;i<gameThat.words.length;i++){
				if(gameThat.matchedIndexes.indexOf(i)==-1){
					console.log(txtLen,gameThat.words[i].matchedLen);
					if(gameThat.words[i].matchedLen==txtLen-1 
						&& gameThat.words[i].matchAll(gameThat.inputTxt.charAt(txtLen-1))){

						gameThat.matchedIndexes.push(i);
					}
				}
			}
		}
	}

}

(new Game()).init();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
