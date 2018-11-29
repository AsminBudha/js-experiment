var sliderContainer = document.getElementById('slider-container');
var ul=document.getElementById('list');

var prev=document.getElementById('prev');
var next=document.getElementById('next');

var list=ul.children;
list[0].classList.add('active');

if(!sliderContainer.style.marginLeft){
	sliderContainer.style.marginLeft = 0+'px';
}

var prev = document.getElementById('prev');
var next = document.getElementById('next');
var images = sliderContainer.children;

var leftWidth = new Array(images.length+1);
leftWidth[0] = 0;
for(var i = 0; i < images.length; i++){
	
	leftWidth[i+1]=-(i+1)*250;
	images[i].style.marginLeft=(i*250)+'px';
}

var currentImageIndex = 0;
var positive = true;

var tick = 0;
var paused = false;

function process(){

	if(!paused){
		slide(positive);
	}
	if(positive && (parseInt(sliderContainer.style.marginLeft))<=leftWidth[currentImageIndex+1]){
		
		list[currentImageIndex].classList.remove('active');
		
		currentImageIndex++;

		list[currentImageIndex].classList.add('active');
		
		paused=true;
		tick=0;

		if(currentImageIndex>=images.length-1){
			positive=false;
			currentImageIndex=images.length;
		}
	}
	else if(!positive && (parseInt(sliderContainer.style.marginLeft))>=leftWidth[currentImageIndex-1]){
		// console.log(currentImageIndex);
		var temp=currentImageIndex;
		if(currentImageIndex==images.length)
			temp--;
		
		list[temp].classList.remove('active');
		
		currentImageIndex--;

		list[currentImageIndex].classList.add('active');
		
		paused=true;
		tick=0;
		
		if(currentImageIndex<=0){
			positive=true;
			currentImageIndex=0;
		}	
	}
	
	tick++;

	if(paused && tick>=30){
		paused=false;

	}
}

function slide(positive){
	var slidePos = positive?-1:1;
	sliderContainer.style.marginLeft=(parseInt(sliderContainer.style.marginLeft)+slidePos)+'px';
}	

var mainInterval=false;
var nextInterval=false;
var prevInterval=false;

function run(){
	mainInterval=setInterval(process,30);
}

prev.addEventListener('click',function(e){
	if(!prevInterval && currentImageIndex>0){

		positive=false;

		clearInterval(mainInterval);

		var temp=currentImageIndex;

		prevInterval=setInterval(function(){
			
			if(temp!=currentImageIndex || parseInt(sliderContainer.style.marginLeft)==0){
				console.log('Prev Ended');
				clearInterval(prevInterval);
				prevInterval=false;
				run();
			}

			process();
			
		},5);	
	}
});

next.addEventListener('click',function(e){
	if(!nextInterval && currentImageIndex<images.length-1){

		positive=true;

		clearInterval(mainInterval);

		var temp=currentImageIndex;

		nextInterval=setInterval(function(){
			process();
			
			if(temp!=currentImageIndex){
				console.log('next Ended');
				clearInterval(nextInterval);
				nextInterval=false;
				run();
			}
			
		},5);	
	}
});

var listInterval;

document.addEventListener('click',function(e){
	var target=e.target;
	if(!listInterval && target.parentNode.getAttribute('id')=='list'){
		var selectedList=target.getAttribute('id');


		
		var temp=currentImageIndex;
		
		var count=Math.abs(selectedList-currentImageIndex)+1;

		console.log(selectedList,temp);
		if(selectedList>temp+1){
			clearInterval(mainInterval);

			positive=true;
			listInterval=setInterval(function(){
				process();
				
				if(currentImageIndex+1>=selectedList){
					
					clearInterval(listInterval);
					listInterval=false;
					run();
				}
				
			},5);

		}
		else if(selectedList<temp+1){
			clearInterval(mainInterval);

			positive=false;
			
			listInterval=setInterval(function(){

				process();
				
				if( currentImageIndex<selectedList){

					clearInterval(listInterval);
					listInterval=false;
					run();
				}
			},5);
		}
		
	}
});

run();