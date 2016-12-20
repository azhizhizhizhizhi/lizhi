var can1;
var can2;
var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();
var ane;

var fruit;

var mom;

var mx;
var my;

var baby;

var data;


var wave;

var halo;



document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop()
}

function init(){
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext("2d");

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg"
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	mx = canWidth*0.5;
	my = canHeight*0.5;

	baby = new babyObj();
	baby.init();   

	data = new dataObj();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
}
function gameloop(){
    window.requestAnimFrame(gameloop);//刷新方法科学的API  比setInterval  setTimout（）  好用 fps 动态的时间间隔
    var now = Date.now();
    deltaTime  = now - lastTime;
    lastTime = now;
    if(deltaTime>40) deltaTime = 40;
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight)
    mom.draw();
    baby.draw();
    momFruitsCollision();
    mombabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
}
function onMouseMove(e){
	if(!data.gameover)
	{
		if(e.offSetX||e.layerX){
			mx = e.offSetX == undefined ? e.layerX:e.offSetX;
			my = e.offSetY == undefined ? e.layerY:e.offSetY;
			// console.log("x:",mx,"y",my);
		}
	}
	
}