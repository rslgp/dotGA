class Population {


    constructor(size) {
      this.dots = [];
      this.fitnessFunction = 0;
      this.fitnessSum = 0;
      this.bestDot = 0;
      this.gen = 1;
      this.minstep = 1000;
      for (let f = 0; f < size; f++) {
        this.dots.push(new Dot());
      }
    }
  
    //Mostrar os pontos
    show() {
      for (let i = 1; i < this.dots.length; i++) {
        this.dots[i].show();
      }
      this.dots[0].show();
      // console.log("gen: "+this.gen);
    }
  
    //Atualizar os pontos
    update() {
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].brain.step > this.minStep) {//se o ponto deus mais passos que o melhor ponto para chegar ao objetivo
          this.dots[i].dead = true; //ele morre
        } else {
          this.dots[i].update();
        }
      }
    }
  
    //calculo da fitness function
    calculateFitness() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].calculateFitness();
      }
    }
  
    //lesgou checar se estão todos mortos ou que ja tenham chegados
    allDotsDead() {
      for (let i = 0; i<this.dots.length; i++) {
        if (!this.dots[i].dead && !this.dots[i].reachedGoal) {
          return false;
        }
      }
      return true;
    }
  
  
    naturalSelection() {
      let newDots = []; //proxima geração
      for (let f = 0; f < this.dots.length; f++) {
        newDots.push(new Dot());
      }
      this.setBestDot();
      this.calculateFitnessSum();
  
      newDots[0] = this.dots[this.bestDot].gimmeBaby();
      newDots[0].isBest = true;
      for (let i = 1; i < newDots.length; i++) {
        //escolhe o pai baseado no fitness
        let parent = this.selectParent();
        newDots[i] = parent.gimmeBaby();
      }
  
      for (let i = 0; i < newDots.length; i++) {
        this.dots[i] = newDots[i];
      }
      this.gen++;
    }
  
    calculateFitnessSum() {
      this.fitnessSum = 0;
      for (let i = 0; i < this.dots.length; i++) {
        this.fitnessSum += this.dots[i].fitness;
      }
    }
  
    //chooses dot from the population to return randomly(considering fitness)
  
    //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
    //then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
    //since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
  
    selectParent() {
      let rand = Math.random()*this.fitnessSum;
      let runningSum = 0;
  
      for (let i =0; i < this.dots.length; i++) {
        runningSum += this.dots[i].fitness;
        if (runningSum > rand) {
          return this.dots[i];
        }
      }
      return null;
    }
  
    //mutaciona os cerebros dos pontos
    mutateBabies() {
      for (let i =1; i<this.dots.length; i++) {
        this.dots[i].brain.mutate();
      }
    }
  
    //acha o ponto com a maior fitness e escolhe ele como o melhor ponto
    setBestDot() {
      let max = 0;
      let maxIndex = 0;
  
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].fitness >max) {
          max = this.dots[i].fitness;
          maxIndex = i;
        }
      }
      this.bestDot = maxIndex;
      //se esse ponto chegou ao final então resete o numero minimo de passos para chegar ao objetivo
      if (this.dots[this.bestDot].reachedGoal) {
        this.minStep = this.dots[this.bestDot].brain.step;
        // console.log("step: ", minStep);
      }
    }
  }
  