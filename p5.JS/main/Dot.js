class Dot{
	constructor(){
		this.brain = new Brain(1000);//brain will have 1000 instructions
		//start the dots at the bottom of the window with no velocity nor acceleration
		this.pos = new Point(windowWidth/2, windowHeight-10);
		this.vel = new Point(0,0);
		this.acc = new Point(0,0);
		this.dead = false;
		this.reachedGoal = false;
		this.isBest=false;//true if this dot is the best dot from previous generation
		this.fitness = 0.0;
	}

	//------------------------------------------------------------------------------------
	//draws the dot on screen
	show(){
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

	collide(line){
		//checar colisao de linha com this.pos
		return false;
	}

	checkCollision(lines){
		for(let i = 0; i < lines.length; i++){
			if(this.collide(line)) return true;
		}
		return false;
	}


	//-------------------------------------------------------------------------------
	//moves the dot according to the brains directions
	move(){
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
	outOfGrid(){
		return pos.x < 2 || pos.y < 2 || pos.x > width-2 || pos.y > heigth - 2;
	}

	update(){
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
	calculateFitness(){
		if(reachedGoal){
			fitness = 1.0/16.0 + 10000.0/(brain.step*brain.step);
		}else {//didnt reached goal
			let distanceGoal = pos.dist(goal);
			fitness = 1.0 / (distanceGoal*distanceGoal);
		}
	}

	gimmeBaby(){
		let baby = new Dot();
		baby.brain = brain.clone();
		return baby;
	}

}
