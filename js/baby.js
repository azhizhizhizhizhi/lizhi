var babyTail = [];
var babyEye = [];
var babyBody = [];

var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	
	this.babyTailTimer;
	this.babyTailCount;

	this.babyEyeTimer;
	this.babyEyeCount;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth*0.5 -50;
	this.y = canHeight*.5 +50;
	this.angle = 0;
	
	this.babyTailTimer=0;
	this.babyTailCount=0;
	this.babyEyeTimer=0;
	this.babyEyeCount=0;


	for(var i = 0;i<8;i++){
       babyTail[i] = new Image();
       babyTail[i].src = "./src/babyTail"+i+".png";
    }

    for(var i =0;i<2;i++){
    	babyEye[i] = new Image();
    	babyEye[i].src = "./src/babyEye"+i+".png";
    }
    for(var i = 0;i<20;i++){
    	babyBody[i] = new Image();
    	babyBody[i].src = "./src/babyFade"+i+".png"
    }
}
babyObj.prototype.draw = function(){
	this.x = lerpDistance(mom.x,this.x,0.985);
	this.y = lerpDistance(mom.y,this.y,0.985);


	var deltaY = mom.y-this.y;
	var deltaX = mom.x-this.x;
	var beta = Math.atan2(-deltaY,-deltaX);


	this.angle=lerpAngle(beta,this.angle,0.6);

    this.babyTailTimer += deltaTime;
    
    if(this.babyTailTimer > 50){
    	this.babyTailCount = (this.babyTailCount + 1)%8;
    	this.babyTailTimer %=50;
    }
    
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer> this.babyEyeInterval){
    	this.babyEyeCount = (this.babyEyeCount+1)%2;
    	this.babyEyeTimer %= this.babyEyeInterval;

    	if(this.babyEyeCount == 0){
    		this.babyEyeInterval = Math.random()*1500+2000;
    	}
    	else{
    		this.babyEyeInterval = 200
    	}
    }
    
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer>200){
    	this.babyBodyCount = this.babyBodyCount + 1;
    	this.babyBodyTimer %= 200;
    	if(this.babyBodyCount>19){
    		this.babyBodyCount = 19;
    		data.gameover = true;
    	}
    }



	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
    
    var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	
	// console.log("ddd")
	ctx1.restore();
}