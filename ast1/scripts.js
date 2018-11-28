var sliderContainer=document.getElementById('slider-container');
if(!sliderContainer.style.marginLeft){
	sliderContainer.style.marginLeft=0+'px';
}

var prev=document.getElementById('prev');
var next=document.getElementById('next');
var images=sliderContainer.children;

var leftWidth=new Array(images.length);

for(var i=0;i<images.length;i++){
	
	leftWidth[i]=-(i+1)*250;
	images[i].style.marginLeft=(i*250)+'px';
}

var currentImageIndex=0;

var positive=true;

var tick=0;
var paused=false;

	
function process(){
	
	// console.log(paused);

	if(!paused){
		slide(positive);
	}
	if((parseInt(sliderContainer.style.marginLeft))<=leftWidth[currentImageIndex]){
		currentImageIndex= positive?currentImageIndex+1:currentImageIndex-1;
		
		paused=true;
		tick=0;
		console.log(sliderContainer.style.left,leftWidth[currentImageIndex]);
		// if(currentImageIndex>=images.length-1){
		// 	positive=false;
		// 	currentImageIndex=images.length-3;
		// }
		// else if(currentImageIndex<0){
		// 	positive=true;
		// 	currentImageIndex=0;
		// }
	}
	
	tick++;
	// console.log(tick);
	if(paused && tick>=30){
		paused=false;

	}
}


function slide(positive){
	var slidePos = positive?-1:1;
	sliderContainer.style.marginLeft=(parseInt(sliderContainer.style.marginLeft)+slidePos)+'px';
	// console.log(sliderContainer.style.marginLeft);
}	

var mainInterval;

function run(){
	mainInterval=setInterval(process,10);
}

run();