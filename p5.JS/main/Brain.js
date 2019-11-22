class Brain {
	var step = 0;
	var directions = []; //PVector
	
	constructor Brain(size){
		directions = []
		for(let f = 0; f < size; f++){
			directions.push(new Point());
		}
		randomize();
	}
	
	function randomize(){
		for(let i = 0; i < directions.length; i++){
			randomAngle = Math.random(3.1415);
			direction[i].fromAngle(randomAngle); //PVector.fromAngle
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
			direction[i].fromAngle(randomAngle); //PVector.fromAngle
		}
	}	
}
