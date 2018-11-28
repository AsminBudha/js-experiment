var sliderContainer=document.getElementById('slider-container');
var prev=document.getElementById('prev');
var next=document.getElementById('next');
var images=sliderContainer.children;

var leftWidth=new Array(images.length+1);
leftWidth[0]=0;
for(var i=0;i<images.length;i++){
	console.log(images[i].width);
	leftWidth[i+1]=leftWidth[i]+images[i].width;
}

var currentImageIndex=0;

function process(){

}

var positive=true;

function slide(){
	var slidePos = positive?-1:1;
	sliderContainer.style.left=(parseInt(sliderContainer.style.left)+slidePos)+'px';
}	


function main(){
	
	
	var tick=0;
	var paused=false;

	var totalLeft=0;
	var current=0;

	var interval=setInterval(slide,30);

	var prevClickHandler=function(e){
		if(current!=0){
			console.log('PRevious');
			positive=false;

			clearInterval(mainInterval);
			clearInterval(interval);
			var nextInterval=setInterval(function(){
				var slidePos = positive?-1:1;
				sliderContainer.style.left=(parseInt(sliderContainer.style.left)+slidePos)+'px';
				if(parseInt(sliderContainer.style.left)>=totalLeft+parseInt(images[current-1].width)){
					current--;
					totalLeft+=parseInt(images[current].width);
					// sliderContainer.style.left=totalLeft+'px';
					
					if(current<1){
						positive=true;
						current=0;
						totalLeft=0;
					}
					setTimeout(run,1000);
					clearInterval(nextInterval);	
				}
			},10);
		}
	};
	function run(){
		console.log('HI');
		interval=setInterval(slide,30);
		mainInterval=setInterval(process,30);
	}
	var nextClickHandler=function(e){
		if(current!=images.length-1){
			console.log('NEXT');
			positive=true;
			clearInterval(mainInterval);
			clearInterval(interval);
			var nextInterval=setInterval(function(){
				var slidePos = positive?-1:1;
				sliderContainer.style.left=(parseInt(sliderContainer.style.left)+slidePos)+'px';
				if(parseInt(sliderContainer.style.left)<=totalLeft-parseInt(images[current].width)){

					totalLeft-=parseInt(images[current].width);
					// sliderContainer.style.left=totalLeft+'px';
					current++;
					if(current>=images.length-1){
						positive=false;
						current=images.length-1;
					}
					setTimeout(run,1000);
					clearInterval(nextInterval);	
				}
				// console.log(this);
					
			},10);	
		}
	};

	prev.addEventListener('click',prevClickHandler);
	next.addEventListener('click',nextClickHandler);

	function process(){

		if( positive && parseInt(sliderContainer.style.left)<=totalLeft-parseInt(images[current].width)){
			clearInterval(interval);
			totalLeft-=parseInt(images[current].width);
			current++;
			tick=0;
			paused=true;
			// console.log('Left',sliderContainer.style.left,totalLeft);
		}
		else if(!positive && parseInt(sliderContainer.style.left)>=totalLeft+parseInt(images[current-1].width)){
			clearInterval(interval);
			current--;
			totalLeft+=parseInt(images[current].width);
			
			tick=0;
			paused=true;
			// console.log('Right',sliderContainer.style.left,totalLeft);	
		}

		if(current>=images.length-1){
			positive=false;
			current=images.length-1;
		}
		else if(current<1){
			positive=true;
			current=0;
			totalLeft=0;
		}	

		tick++;
		if(paused && tick==30){
			paused=false;
			interval=setInterval(slide,30);
	
		}
	}
	var mainInterval=run;
}
main();