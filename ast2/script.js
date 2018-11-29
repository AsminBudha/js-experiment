var moveX=[ 0 ,  1 , 1 , 1 , 0 , -1 , -1 , -1];
var moveY=[-1 , -1 , 0 , 1 , 1 ,  1 ,  0 , -1];

var UP=0,UP_RIGHT=1,RIGHT=2,DOWN_RIGHT=3,DOWN=4,DOWN_LEFT=5,LEFT=6,UP_LEFT=7;

var balls=[];
function changeDirection(direction){
    switch(direction){
        case UP:
            direction=DOWN;
            break;
        case DOWN:
            direction=UP;
            break;
        case LEFT:
            direction=RIGHT;
            break;
        case RIGHT:
            direction=LEFT;
            break;
        case UP_LEFT:
            direction=DOWN_RIGHT;
            break;
        case DOWN_RIGHT:
            direction=UP_LEFT;
            break;
        case UP_RIGHT:
            direction=DOWN_LEFT;
            break;
        case DOWN_LEFT:
            direction=UP_RIGHT;
            break;
    }
    return direction;
}

function Ball(x,y,radius,index){
    var that=this;
    this.x=x;
    this.y=y;
    this.index=index;
    this.radius=radius;
    this.direction;
    this.elem;
    
    this.move=function(){
        this.direction=Math.floor(Math.random()*8);
        
        var speed=Math.floor(Math.random()*100);
        
        setInterval(function(){

            that.update(moveX[that.direction],moveY[that.direction]);
            that.checkCollision();

        },speed);
    };
    this.update=function(x,y){
        this.elem.style.top=parseInt(this.elem.style.top)+y+'px';
        this.elem.style.left=parseInt(this.elem.style.left)+x+'px';
        this.x+=x;
        this.y+=y;
    };
    this.checkCollision=function(){        
    	
    	//Container collison
    	if(this.x+this.radius>=500 || this.x-this.radius<=0 || this.y-this.radius<=0 || this.y+radius>=500){
            this.direction=changeDirection(this.direction);
        }

        //Ball Collision
        for(var i=0;i<balls.length;i++){
            if(i==this.index)
                continue;
            var nextBall=balls[i];
            // console.log(nextBall.radius+this.radius,distanceFromThis(nextBall.x,nextBall.y));
            if(nextBall.radius+this.radius>this.distanceFromThis(nextBall.x,nextBall.y)){
                // console.log('Here');
                var temp=this.direction;
                this.direction=nextBall.direction;
                nextBall.direction=temp;
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
        // console.log(this.elem);
        var container=document.getElementById('container');
        container.appendChild(this.elem);
    };

    this.distanceFromThis=function(x1,y1){
        var delx=x1-this.x;
        var dely=y1-this.y;
        // console.log(x1,x);
        return Math.sqrt((delx*delx)+(dely*dely));
    }
}

function main(){    
	for(var i=0;i<10;i++){

        var r=Math.ceil((Math.random()*20)+10);
        // console.log();
        var x=Math.ceil((Math.random()*500)%(500-(2*r+1))+r);
        var y=Math.ceil((Math.random()*500)%(500-(2*r+1))+r);
        
        console.log(r,x,y);

        var ball=new Ball(x,y,r,i);
        ball.draw();
        ball.move();        
        balls.push(ball);
    }
}

main();