class Dot {
  constructor() {

    //start the dots at the bottom of the window with no velocity nor acceleration
    this.pos = new Point(300, 600-20);//posicao inicial dos dots aqui
    this.vel = new Point(0, 0);
    this.acc = new Point(0, 0);
    this.brain = new Brain(1000);//brain will have 1000 instructions

    this.dead = false;
    this.endedAlive=false;
    this.reachedGoal = false;
    this.isBest=false;//true if this dot is the best dot from previous generation

    this.fitness = 0;
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
      fill(0);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

  collide(line) {//TODO
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
    if (this.brain.directions.length > this.brain.step) {//if there are still directions to go
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;

      //console.log("moving");
      if (choice==1) {
        //
      } else if (choice==2 /*&& this.brain.step > 1000*/) {
        //console.log("ended alive");
        //this.endedAlive=true;
      }
      //console.log("alive");
    } else {//if directions ended
      if (choice==1) {
        this.dead = true;
      } else if (choice==2) {
        this.endedAlive=true;//morre vivo
        this.dead=true;
      }
      //console.log(this.brain.length, this.brain.step);
      //console.log("dead by brain");
    }

    //apply the acceleration and move the dot
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    //console.log("posx "+this.pos.x);
    //console.log("posy "+this.pos.y);
  }

  //---------------------------------------------------------------------------------
  //calls the move function and check for collisions
  outOfGrid() {//Gs declarados no main
    return this.pos.x < GX1 || this.pos.y < GY1 || this.pos.x > GX2 || this.pos.y > GY2;
  }

  update() {
    if (!this.dead && !this.reachedGoal && !this.endedAlive) {
      this.move();
      //console.log(this.pos.dist(goal));
      if (this.outOfGrid()) {//out of grid
        this.dead = true;
        //console.log("dead por aut of grid");
      } else if (this.pos.dist(goal) < 5) {//reached goal
        if (choice==1) {
          this.reachedGoal = true;
          //console.log("chegou no objetivo");
        } else if (choice ==2) {
          this.reachedGoal=true;
        }
      } else if (this.checkCollision(obstaculos/*isso ta dclarado no main*/)) {//collides with some line
        this.dead = true;
        //console.log("dead por obstaculo");
      }
    }
  }
  //--------------------------------------------------------------------------------
  //possivelmente alterar isso
  calculateFitness() {
    if (this.reachedGoal) {
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step*this.brain.step);
      console.log(this.fitness);
    } else {//didnt reached goal
      let distanceGoal = this.pos.dist(goal);
      this.fitness = 1.0 / (distanceGoal*distanceGoal);
    }
  }
  //-----------------------------------------------------------------------------
  distToWall() {
    let dup=Math.abs(this.pos.x - GX1);
    let dbot=Math.abs(this.pos.x - GX2);
    let dleft=Math.abs(this.pos.y - GY1);
    let dright=Math.abs(this.pos.y - GY2);

    let dis = Math.min(dup, dbot);
    dis = Math.min(dis, dleft);
    dis = Math.min(dis, dright);
    return dis;
  }

  calculateFitness2() {
    if (this.endedAlive) {
      let dg = this.pos.dist(goal);
      let dw = this.distToWall();
      let dmin=100000;//guarda a menor distancia entre 2 pontos diferentes
      let dmax=0;
      let area = 0;
      let radius = 150;
      let circle = 6.2830*150;
      for (let i=0; i<test.dots.length; i++) {
        if (this.pos.equal(test.dots[i].pos)) {
          continue;//nao checa pontos na msma posicao
        } else {
          dmin = Math.min(dmin, this.pos.dist(test.dots[i].pos));
          dmax = Math.max(dmax, this.pos.dist(test.dots[i].pos));
          area+=this.pos.dist(test.dots[i].pos);
        }
      }

      let constante = 20000;
      this.fitness=this.brain.step/1000;
      this.fitness*=constante*(Math.sqrt(dw*dw*dw*dmin)/(Math.sqrt(dg*dg*dmax*2)))*(1/Math.abs(area - circle));
      if (dw>dg) {
        this.fitness*=1/(Math.abs(dw-dg));
      }
      console.log("vivo "+this.fitness);
    } else if (this.reachedGoal) {
      this.fitness=this.brain.step/1000000;
      //console.log("steps= "+ this.brain.steps);
      console.log("morreu no objetivo "+this.fitness);
    } else if (this.dead) {
      this.fitness=0;
      //console.log("morreu por parede "+this.fitness);
    }
  }

  gimmeBaby() {
    let baby = new Dot();
    baby.brain = this.brain.clone();
    return baby;
  }
}
