//碰撞检测
//判断大鱼和果实的距离
function momFruitsCollision()
{
	if(!data.gameover)
	{
		for(var i = 0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					fruit.dead(i);
					console.log("果实被吃了");
					data.fruitNum++;
					if(mom.momBodyCount < 6) {
						mom.momBodyCount++;
					}
					if(mom.momBodyCount > 7){
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue"){
					    data.double = 2;//吃到蓝色果实
					}
					else {
                        data.double=1; //吃到橙色果实
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }


            }
        }
    }

}

//大鱼喂小鱼
function mombabyCollision(){

	if(data.fruitNum > 0 && !data.gameover){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			data.addScore();
			halo.born(baby.x,baby.y)
		}
	}
	
}