var QtdDeBixo = 1000;
var test = new Population(QtdDeBixo);
var goal = new Point(300, 2);
var obstaculos = new Lines();

//limites do grid, usado no Dot.js no outOfGrid()
var GX1=0;
var GY1=0;
var GX2=600;
var GY2=600;

//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");

function setup() {
 
  createCanvas(GX2, GY2);
  frameRate(100);
}


function draw() {
  background(255);

  //desenhar o objetivo
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);
  fill(0,0,255);
  ellipse(GX1, GY1, 10, 10);
  ellipse(GX2, GY1, 10, 10);
  ellipse(GX1, GY2, 10, 10);
  ellipse(GX2, GY2, 10, 10);
  
  
  obstaculos.show();

  if (test.allDotsDead()) {
    //algoritmo genético
    test.calculateFitness();
    test.naturalSelection();
    test.mutateBabies();
  } else {
    //se quaisquer outros pontos ainda está vivo, então atualize e os mostre

    test.update();
    test.show();
  }
}
