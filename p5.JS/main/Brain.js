class Brain {
	constructor(size) {
		this.directions = [];
		this.step = 0;
		for(let f = 0; f < size; f++){
			directions.push(new Point());
		}
		console.log("Foram adicionados: ", size, " pontos ao Brain");
		console.log("Preparar randomização.");
		randomize();
	}

	randomize() {
		for(let i = 0; i < directions.length; i++){
			randomAngle = Math.random(3.1415);
			direction[i].fromAngle(randomAngle); //PVector.fromAngle
		}
		console.log("Houve randomização!")
	}

	clone() {
		let clone = new Brain();
		for(let i = 0; i < directions.length; i++){
			clone.directions[i] = directions[i];
		}
		console.log("Clonando Brain");
		return clone;
	}

	mutate() {
		mutationRate = 0.01;
		for(let i = 0; i < directions.length; i++){
			rand = random();
			if(rand < mutationRate){
				randomAngle = random(randomAngle);
			}
			direction[i].fromAngle(randomAngle); //PVector.fromAngle
		}
		console.log("Mutacionando com taxa de mutação:", mutationRate);
	}	
}
