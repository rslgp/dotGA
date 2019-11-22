class Population{
  //Dot[] dots;
  
 fitnessFunction = 0;
 gen = 1;
 bestDot = 0;
  
  Population(size){
    dots = new Dot[size];
    for (let a =0;a < size; a++){
      dots[a]=new Dot();
  }
}

//Mostrar os pontos
function show(){
  for(let i = 1;i < dots.length();i++){
      dots[i].show();
  }
  dots[0].show();
}

//Atualizar os pontos
function update(){
    for(let i = 0;i < dots.length(); i++){
        if(dots[i].brain.step > minStep){//se o ponto deus mais passos que o melhor ponto para chegar ao objetivo
        dots[i].dead = true; //ele morre
        }else{
            dots[i].update();
        }
    }
}

//calculo da fitness function
function calculateFitness(){
    for(let i = 0; i < dots.length();i++){
        dots[i].calculateFitness();
    }
}

//lesgou checar se estão todos mortos ou que ja tenham chegados
function allDotsDead(){
    for(let i =0; i<dots.length();i++){
        if(!dots[i].dead() && !dots[i].reachedGoal()){
            return false;
        }
    }
    return true;
}


function naturalSelection(){
    Dot[] newDots = new Dot[dots.length()]; //proxima geração
    setBestDot();
    calculateFitnessSum();

    newDots[0] = dots[bestDot].gimmeBaby();
    newDots[0].isBest = true;
    for(let i = 1;i <newDots.length();i++){
        //escolhe o pai baseado no fitness
        Dot parent = selectParent();

        newDots[i] = parent.gimmeBaby();
    }

    dots = newDots.clone();
    gen++;
}

function calculateFitnessSum(){
    var fitnessSum = 0;
    for(let i = 0; i <dots.length();i++){
        fitnessSum += dots[i].fitness;
    }
}

//chooses dot from the population to return randomly(considering fitness)

//this function works by randomly choosing a value between 0 and the sum of all the fitnesses
//then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
//since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
  
function selectParent(){
    let rand = random(fitnessSum);
    let runningSum = 0;
    
    for (let i =0;i <dots.length();i++){
        runningSum += dots[i].fitness;
        if(runningSum > rand){
            return dots[i];
        }
    }
    return null;
}

//mutaciona os cerebros dos pontos
function mutateBabies(){
    for (let i =1;i<dots.length();i++){
        dots[i].brain.mutate();
    }
}

//acha o ponto com a maior fitness e escolhe ele como o melhor ponto
function setBestDot(){
    let max = 0;
    let maxIndex = 0;

    for(let i = 0; i < dots.length();i++){
        if(dots[i].fitness >max){
            max = dots[i].fitness;
            maxIndex = i;
        }
    }
    bestDot = maxIndex;
    //se esse ponto chegou ao final então resete o numero minimo de passos para chegar ao objetivo
    if(dots[bestDot].reachedGoal{
        minStep = dots[bestDot].brain.step;
        console.log("step: ",minStep);
    }

}

}
