var moveX=[ 0 ,  1 , 1 , 1 , 0 , -1 , -1 , -1];
var moveY=[-1 , -1 , 0 , 1 , 1 ,  1 ,  0 , -1];

// var UP=0,UP_RIGHT=1,RIGHT=2,DOWN_RIGHT=3,DOWN=4,DOWN_LEFT=5,LEFT=6,UP_LEFT=7;

function Ball(x,y,radius,index){
    var that=this;
    this.x=x;
    this.y=y;
    this.index=index;
    this.radius=radius;
    this.direction;
    this.elem;
    this.direction=Math.floor(Math.random()*8);
    this.speed=Math.floor(Math.random()*5);

    this.move=function(){

        that.update(moveX[that.direction],moveY[that.direction]);
        that.checkCollision();
    };
    this.update=function(x,y){
        this.elem.style.top=parseInt(this.elem.style.top)+y+'px';
        this.elem.style.left=parseInt(this.elem.style.left)+x+'px';
        this.x+=x;
        this.y+=y;
    };
    this.checkCollision=function(){

    	if(this.x+this.radius>=500 || this.x-this.radius<=0 || this.y-this.radius<=0 || this.y+radius>=500){

            if(this.direction%2==1){

                this.direction=(this.direction+2)%8;
            }
            else{
                this.direction=(this.direction+4)%8;

            }

            return true;
        }

        //Ball Collision
        for(var i=0;i<balls.length;i++){
            if(i==this.index)
                break;
            var nextBall=balls[i];
            if(nextBall.radius+this.radius>=this.distanceFromThis(nextBall.x,nextBall.y)){
                var temp=this.direction;
                this.direction=nextBall.direction;
                nextBall.direction=temp;
                return true;
            }
        }

    };

    this.draw=function(){
        this.elem=document.createElement('div');
        this.elem.style.position='absolute';
        this.elem.style.top=(this.y-this.radius)+'px';
        this.elem.style.left=(this.x-this.radius)+'px';
        this.elem.style.height=this.radius*2+'px';
        this.elem.style.width=this.radius*2+'px';

        var color='rgb('+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+')'

        this.elem.style.background=color;
        this.elem.style.borderRadius='50px';

        var container=document.getElementById('container');
        container.appendChild(this.elem);
    };

    this.distanceFromThis=function(x1,y1){
        var delx=x1-this.x;
        var dely=y1-this.y;

        return Math.sqrt((delx*delx)+(dely*dely));
    }
    this.remove=function(){
        var container=document.getElementById('container');

        container.removeChild(this.elem);
    }
}

var balls=[];
var ballIndex=0;
function main(){
    var timers=[];
	for(var i=0;i<10;i++){
        do{
            if(balls.length>i){
                balls[i].remove();
            }
            var r=Math.ceil((Math.random()*20)+10);

            var x=Math.ceil((Math.random()*500)%(500-(2*r+1))+r);
            var y=Math.ceil((Math.random()*500)%(500-(2*r+1))+r);

            var ball=new Ball(x,y,r,i);
            ball.draw();
            ball.move();
            balls[i]=(ball);

        }while(balls[i].checkCollision());

        timers.push(0);
    }

    setInterval(function(){
        for(var i=0;i<balls.length;i++){
            timers[i]++;
            if(timers[i]>=balls[i].speed){
                balls[i].move();
                timers[i]=0;
            }
        }
    });
}

function compare(a,b){
    return a.speed>b.speed;
}

main();
