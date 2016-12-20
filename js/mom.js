var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];


var momObj = function(){
	this.x;
	this.y;
	
	
	this.angle;

	this.momTailTimer ;
	this.momTailCount ;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount;

}


momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	
	this.momTailTimer= 0 ;
	this.momTailCount= 0 ;

	this.momBodyCount = 0;

	for(var i = 0;i<8;i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail"+i+".png";
	}
	for(var i = 0;i<2;i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye"+i+".png";
	}
	for(var i = 0;i<8;i++){
    	momBodyOra[i] = new Image();
    	momBodyBlue[i] = new Image();
    	momBodyOra[i].src = "./src/bigSwim"+i+".png";
    	momBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
    }

}
momObj.prototype.draw = function(){


	this.x = lerpDistance(mx,this.x,0.93);
	this.y = lerpDistance(my,this.y,0.93);


	var deltaY = my-this.y;
	var deltaX = mx-this.x;
	var beta = Math.atan2(-deltaY,-deltaX);

	this.momTailTimer += deltaTime;
	if(this.momTailTimer >50){
		this.momTailCount = (this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}

	
    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer> this.momEyeInterval){
    	this.momEyeCount = (this.momEyeCount+1)%2;
    	this.momEyeTimer %= this.momEyeInterval;

    	if(this.momEyeCount == 0){
    		this.momEyeInterval = Math.random()*1500+2000;
    	}
    	else{
    		this.momEyeInterval = 200
    	}
    }

	this.angle=lerpAngle(beta,this.angle,0.6)
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+23,-momTail[momTailCount].height*0.5);

	var momBodyCount = this.momBodyCount;
	if(data.double == 1){
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
           
	}
	else{
       ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
       data.gameover = true;
	}

	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);


	ctx1.restore();
}
