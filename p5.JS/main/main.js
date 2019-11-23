var test = new Population(100);
var goal = new Point(400, 10);
 
var QtdDeBixo = 1000;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function setup() {
   createCanvas(800,800);
   frameRate(100);
   //teste = new Population(QtdDeBixo);
}


function draw() {
  background(255);
  
  //desenhar o objetivo
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);
  
  //desenhar obstáculo(s)
  fill(0, 0, 255);
  rect(0, 300, 600, 10);
  
  if(test.allDotsDead()) {
    //algoritmo genético
    test.calculateFitness();
    test.naturalSelection();
    test.mutateDemBabies();
  } else {
    //se quaisquer outros pontos ainda está vivo, então atualize e os mostre
    
    test.update();
    test.show();
  }
}
