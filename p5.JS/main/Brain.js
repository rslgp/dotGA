class Brain {
	var pairs = [{x: '', y: ''}];
	directions = []; //PVector
	
	constructor Brain(size){
		directions = [] //PVector[size]
		randomize();
	}
	
	function randomize(){
		for(let i = 0; i < directions.length; i++){
			randomAngle = Math.random(3.1415);
			directions[i].x = Math.sin(randomAngle); //PVector.fromAngle
			directions[i].y = Math.cos(randomAngle); //PVector.fromAngle
		}
	}
	
	function Brain clone(){
		Brain clone = new Brain();
		for(let i = 0; i < directions.length; i++){
			clone.directions[i] = directions[i];
		}
		return clone;
	}
	
	function mutate(){
		mutationRate = 0.01;
		for(let i = 0; i < directions.length; i++){
			rand = random();
			if(rand < mutationRate){
				randomAngle = random(randomAngle);
			}
			directions[i].x = Math.sin(randomAngle); //PVector.fromAngle
			directions[i].y = Math.cos(randomAngle); //PVector.fromAngle
		}
		
	}
	
}
