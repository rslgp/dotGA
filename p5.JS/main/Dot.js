class Dot {
  constructor() {

    //start the dots at the bottom of the window with no velocity nor acceleration
    this.pos = new Point(300, 600-20);//posicao inicial dos dots aqui
    this.vel = new Point(0, 0);
    this.acc = new Point(0, 0);
    this.brain = new Brain(1000);//brain will have 1000 instructions

    this.dead = false;
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
    //console.log(line.p1);
    //console.log(line.p2);
    function quadrado (x) {
      return x * x;
    }
    
    function dist2 (v, w) {
      return Math.sqrt(v.x - w.x) + Math.sqrt(v.y - w.y);
    }
    
    // p - ponto
    // v - começo da reta
    // w - fim    da reta
    
    function distToSegmentSquared (p, v, w) {
    // Os pontos entram aqui como p, v, w
    // Atributos de pontos são .x e .y
    var l2 = dist2(v, w);
    
    if (l2 === 0) return dist2(p, v);
    
    var t = ((p.x.x - v.x) * (w.x.x - v.x.x) + (p.x.y - v.x.y) * (w.x.y - v.x.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, [ v.x.x + t * (w.x.x - v.x.x), v.x.y + t * (w.x.y - v.x.y) ]);
    }
    
    console.log(Math.sqrt(distToSegmentSquared(this.pos, line.p1, line.p2)));
    let output = (Math.sqrt(distToSegmentSquared(this.pos, line.p1, line.p2)) < 5);
    // São passados 3 pontos para a função
    console.log("Terminei o collide ", output);
    return output;
  }

  checkCollision(lines) {
    //console.log(lines.lines[0].p1.x.y);
    for (let i = 0; i < lines.lines.length; i++) {
      //console.log(lines);
      if (this.collide(lines.lines[i])) {
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
      //console.log("alive");
    } else {//if directions ended
      this.dead = true;
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
    if (!this.dead && !this.reachedGoal) {
      this.move();
      //console.log(this.pos.dist(goal));
      if (this.outOfGrid()) {//out of grid
        this.dead = true;
        //console.log("dead por aut of grid");
      } else if (this.pos.dist(goal) < 5) {//reached goal
        this.reachedGoal = true;
        //console.log("chegou no objetivo");
        console.log(this.pos.x);
        console.log(this.pos.y);
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

  


  gimmeBaby() {
    let baby = new Dot();
    baby.brain = this.brain.clone();
    return baby;
  }
}
