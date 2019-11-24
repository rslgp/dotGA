class Dot {
  constructor() {
    this.brain = new Brain(1000);//brain will have 1000 instructions
    //start the dots at the bottom of the window with no velocity nor acceleration
    this.pos = new Point(100, 100);//posicao inicial dos dots aqui
    this.vel = new Point(0, 0);
    this.acc = new Point(0, 0);
    this.dead = false;
    this.reachedGoal = false;
    this.isBest=false;//true if this dot is the best dot from previous generation
    this.fitness = 0.0;
  }

  //------------------------------------------------------------------------------------
  //draws the dot on screen
  show() {
    //use fitness here as a parameter of color used to paint the dot
    //fill(fitness/2,fitness/3,fitness/4); //maybe change the formulas
    //ellipse(pos.x, pos.y,8,8);//draw circle
    if (this.isBest) {
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 8, 8);
    } else {
      fill(255, 255, 0);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

  collide(line) {
    //checar colisao de linha com this.pos
    return false;
  }

  checkCollision(lines) {
    for (let i = 0; i < lines.length; i++) {
      if (this.collide(line)) {
        return true;
      }
    }
    return false;
  }


  //-------------------------------------------------------------------------------
  //moves the dot according to the brains directions
  move() {
    if (this.brain.length > this.brain.step) {//if there are still directions to go
      this.acc = this.brain.direction[this.brain.step];
      this.brain.step++;
      console.log("alive");
    } else {//if directions ended
      this.dead = true;
      console.log("dead no move");
    }

    //apply the acceleration and move the dot
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    console.log("posx "+this.pos.x);
    console.log("posy "+this.pos.y);
  }

  //---------------------------------------------------------------------------------
  //calls the move function and check for collisions
  outOfGrid() {
    return this.pos.x < 2 || this.pos.y < 2 || this.pos.x > 600 || this.pos.y > 600;
  }

  update() {
    if (!this.dead && !this.reachedgoal) {
      this.move();
      if (this.outOfGrid()) {//out of grid
        this.dead = true;
         console.log("dead por aut of grid");
      } else if (this.pos.dist(goal) < 5) {//reached goal
        this.reachedGoal = true;
      } else if (this.checkCollision(obstaculos/*isso ta dclarado no main*/)) {//collides with some line
        this.dead = true;
         console.log("dead por parede");
      }
    }
  }
  //--------------------------------------------------------------------------------
  //possivelmente alterar isso
  calculateFitness() {
    if (this.reachedGoal) {
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step*this.brain.step);
    } else {//didnt reached goal
      let distanceGoal = this.pos.dist(goal);
      this.fitness = 1.0 / (distanceGoal*distanceGoal);
    }
  }

  gimmeBaby() {
    let baby = new Dot();
    baby.brain = this.brain.clone();
    return baby;
  }
}
