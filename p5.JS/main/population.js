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
void show(){
  for(let i = 1;i < dots.length();i++){
      dots[i].show();
  }
  dots[0].show();
}

//Atualizar os pontos
void update(){
    for(let i = 0;i < dots.length(); i++){
        if(dots[i].brain.step > minStep){//se o ponto deus mais passos que o melhor ponto para chegar ao objetivo
        dots[i].dead = true; //ele morre
        }else{
            dots[i].update();
        }
    }
}

//calculo da fitness function
void calculateFitness(){
    for(let i = 0; i < dots.length();i++){
        dots[i].calculateFitness();
    }
}

//lesgou checar se estão todos mortos ou que ja tenham chegados
boolean allDotsDead(){
    for(let i =0; i<dots.length();i++){
        if(!dots[i].dead() && !dots[i].reachedGoal()){
            return false;
        }
    }
    return true;
}


void naturalSelection(){
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

void calculateFitnessSum(){
    var fitnessSum = 0;
    for(let i = 0; i <dots.length();i++){
        fitnessSum += dots[i].fitness();
    }
}





}
