class Dot{
	let pos;
	let vel;
	let acc;
	let brain;

	let dead = false;
	let reachedGoal = false;
	let isBest=false;//true if this dot is the best dot from previous generation

	let fitness = 0.0;

	constructor(){
		brain = new Brain(1000);//brain will have 1000 instructions

		//start the dots at the bottom of the window with no velocity nor acceleration
		pos = new Point(width/2, height-10);
		vel = new Point(0,0);
		acc = new Point(0,0);
	}

	//------------------------------------------------------------------------------------
	//draws the dot on screen
	function show(){
		//use fitness here as a parameter of color used to paint the dot
		//fill(fitness/2,fitness/3,fitness/4); //maybe change the formulas
		//ellipse(pos.x, pos.y,8,8);//draw circle
		if(isBest){
			fill(0,255,0);
			ellipse(pos.x,pos.y,8,8);
		}else{
			fill(0);
			ellipse(pos.x,pos.y,4,4);
		}
	}

	function collide(line){
		//checar colisao de linha com this.pos
		return false;
	}

	function checkCollision(lines){
		for(let i = 0; i < lines.length; i++){
			if(this.collide(line)) return true;
		}
		return false;
	}


	//-------------------------------------------------------------------------------
	//moves the dot according to the brains directions
	function move(){
		if(brain.length > brain.step){//if there are still directions to go
			acc = brain.direction[brain.step];
			brain.step++;
		}else{//if directions ended
			dead = true;
		}

		//apply the acceleration and move the dot
		vel.add(acc);
		vel.limit(5);
		pos.add(vel);
	}

	//---------------------------------------------------------------------------------
	//calls the move function and check for collisions
	function outOfGrid(){
		return pos.x < 2 || pos.y < 2 || pos.x > width-2 || pos.y > heigth - 2;
	}

	function update(){
		if(!dead && !reachedgoal){
			move();
			if(outOfGrid()){//out of grid
				dead = true;
			}else if(pos.dist(goal) < 5){//reached goal
				reachedGoal = true;
			}else if(checkCollision(lines)){//collides with some line
				dead = true;
			}
		}
	}
	//--------------------------------------------------------------------------------
	//possivelmente alterar isso
	function calculateFitness(){
		if(reachedGoal){
			fitness = 1.0/16.0 + 10000.0/(brain.step*brain.step);
		}else {//didnt reached goal
			let distanceGoal = pos.dist(goal);
			fitness = 1.0 / (distanceGoal*distanceGoal);
		}
	}

	function gimmeBaby(){
		let baby = new Dot();
		baby.brain = brain.clone();
		return baby;
	}

}
