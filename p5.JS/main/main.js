var QtdDeBixo = 500;
var test = new Population(QtdDeBixo);
var goal = new Point(400, 400);
var obstaculos = new Lines();

//limites do grid, usado no Dot.js no outOfGrid()
var GX1=2;
var GY1=2;
var GX2=800;
var GY2=800;

//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");

function setup() {
  createCanvas(800, 800);
  frameRate(100);
  //teste = new Population(QtdDeBixo);
}


function draw() {
  background(255);

  //desenhar o objetivo
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);

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
