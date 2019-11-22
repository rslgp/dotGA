class Population{
    
    
    constructor(size){
    this.dots = [];
    this.fitnessFunction = 0;
    this.bestDot = 0;
    this.gen = 1;
    dots = new Dot[size];
    for (let a =0;a < size; a++){
      dots[a]=new Dot();
  }
}

//Mostrar os pontos
 show(){
  for(let i = 1;i < dots.length;i++){
      dots[i].show();
  }
  dots[0].show();
}

//Atualizar os pontos
 update(){
    for(let i = 0;i < dots.length; i++){
        if(dots[i].brain.step > minStep){//se o ponto deus mais passos que o melhor ponto para chegar ao objetivo
        dots[i].dead = true; //ele morre
        }else{
            dots[i].update();
        }
    }
}

//calculo da fitness function
calculateFitness(){
    for(let i = 0; i < dots.length;i++){
        dots[i].calculateFitness();
    }
}

//lesgou checar se estão todos mortos ou que ja tenham chegados
allDotsDead(){
    for(let i =0; i<dots.length;i++){
        if(!dots[i].dead() && !dots[i].reachedGoal()){
            return false;
        }
    }
    return true;
}


naturalSelection(){
    let newDots = new Dot[dots.length]; //proxima geração
    setBestDot();
    calculateFitnessSum();

    newDots[0] = dots[bestDot].gimmeBaby();
    newDots[0].isBest = true;
    for(let i = 1;i <newDots.length;i++){
        //escolhe o pai baseado no fitness
        let parent = selectParent();

        newDots[i] = parent.gimmeBaby();
    }

    dots = newDots.clone();
    gen++;
}

calculateFitnessSum(){
    var fitnessSum = 0;
    for(let i = 0; i <dots.length;i++){
        fitnessSum += dots[i].fitness;
    }
}

//chooses dot from the population to return randomly(considering fitness)

//this function works by randomly choosing a value between 0 and the sum of all the fitnesses
//then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
//since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
  
 selectParent(){
    let rand = random(fitnessSum);
    let runningSum = 0;
    
    for (let i =0;i <dots.length;i++){
        runningSum += dots[i].fitness;
        if(runningSum > rand){
            return dots[i];
        }
    }
    return null;
}

//mutaciona os cerebros dos pontos
 mutateBabies(){
    for (let i =1;i<dots.length;i++){
        dots[i].brain.mutate();
    }
}

//acha o ponto com a maior fitness e escolhe ele como o melhor ponto
 setBestDot(){
    let max = 0;
    let maxIndex = 0;

    for(let i = 0; i < dots.length;i++){
        if(dots[i].fitness >max){
            max = dots[i].fitness;
            maxIndex = i;
        }
    }
    bestDot = maxIndex;
    //se esse ponto chegou ao final então resete o numero minimo de passos para chegar ao objetivo
    if(dots[bestDot].reachedGoal){
        minStep = dots[bestDot].brain.step;
        console.log("step: ",minStep);
    }

}

}
