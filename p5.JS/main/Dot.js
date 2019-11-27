class Dot {
  constructor() {

    //start the dots at the bottom of the window with no velocity nor acceleration
    this.pos = new Point(300, 600-20);//posicao inicial dos dots aqui
    this.vel = new Point(0, 0);
    this.acc = new Point(0, 0);
    this.brain = new Brain(neuronios);//cerebro vai começar com 5 instruções
    this.angle = 1;
    this.dead = false;
    this.endedAlive=false;
    this.reachedGoal = false;
    this.isBest=false;//true if this dot is the best dot from previous generation

    this.fitness = 0;
  }

  //------------------------------------------------------------------------------------
  //draws the dot on screen
  show() {//FAZER FUNCAO DE SIMILIARIDADE
    //use fitness here as a parameter of color used to paint the dot
    //fill(fitness/2,fitness/3,fitness/4); //maybe change the formulas
    //ellipse(pos.x, pos.y,8,8);//draw circle
    if (this.isBest) {
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 8, 8);
    } else {
      //let rgb = this.brain.getColor();
     // fill(rgb[0],rgb[1],rgb[2]);
      fill(0);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }
  collide(line) {//TODO
    function quadrado (x) {
      return x * x;
    }

    let p = this.pos.copy();
    let v = line.p1.copy();
    let w = line.p2.copy();

    function dist2 (v, w) {
      return quadrado(v.x - w.x) + quadrado(v.y - w.y);
    }
    function dist22 (v, w) {
      return quadrado(v.x - w[0]) + quadrado(v.y - w[1]);
    }

    // p - ponto
    // v - começo da reta
    // w - fim    da reta

    function distToSegmentSquared (p, v, w) {
      // Os pontos entram aqui como p, v, w
      // Atributos de pontos são .x e .y
      var l2 = dist2(v, w);

      if (l2 === 0) return dist2(p, v.x);

      var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      return dist22(p, [ v.x + t * (w.x - v.x), v.y + t * (w.y - v.y) ]);
    }

    let output = (Math.sqrt(distToSegmentSquared(this.pos, line.p1, line.p2)) < 5);
    // São passados 3 pontos para a função
    //console.log("Terminei o collide ", output);
    return output;
  }

  checkCollision(lines) {
    //console.log(lines.lines[0].p1.x.y);
    for (let i = 0; i < lines.length; i++) {
      if (this.collide(lines[i])) {
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
        this.reachedGoal = true;
        //console.log("chegou no objetivo");
      } else if (this.checkCollision(obstaculos.lines)) {//collides with some line
        this.dead = true;
        //console.log("dead por obstaculo");
      }
    }
  }
  //--------------------------------------------------------------------------------
  //possivelmente alterar isso
  calculateFitness() {
    if(this.endedAlive){
      let distanceGoal = this.pos.dist(goal);
      this.fitness = this.brain.step*this.brain.step*this.brain.step/distanceGoal;
    } else if (this.reachedGoal) {
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step*this.brain.step);
    } else {//didnt reached goal
      let distanceGoal = this.pos.dist(goal);
      this.fitness =  this.brain.step *this.brain.step / (distanceGoal)*distanceGoal;
      if(distanceGoal<100){
          this.fitness  = this.brain.step *this.brain.step;
      }
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
      this.fitness*=constante*(Math.sqrt(dw*dw*dg*dg*dmin*dmin)/(Math.sqrt(dmax*dmax)))*(1/(Math.abs(area - circle)+0.1));
      this.fitness*=1/(0.1+Math.abs(dw-dg));

      // console.log("vivo "+this.fitness);
    } else if (this.reachedGoal) {
      this.fitness=this.brain.step/1000000;
      //console.log("steps= "+ this.brain.steps);
      // console.log("morreu no objetivo "+this.fitness);
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
