var QtdDeBixo = 100;
var increaseMovesBy = 5;
var neuronios = 5;
let choice = 2;
var mutation =  0.01;
if (choice==2) {
  neuronios = 500;
  QtdDeBixo = 1000;
  mutation = 0.0012;
} else if (choice==1) {
  QtdDeBixo = 100;
  increaseMovesBy = 5;
  mutation = 0.01;
}

var test = new Population(QtdDeBixo);
var goal = new Point(300, 300);
var obstaculos = new Lines();
//obstaculos.add(new Line([300, 10], [300, 500]));
//obstaculos.add(new Line([305, 11], [305, 500]));

//limites do grid, usado no Dot.js no outOfGrid()
var GX1=0;
var GY1=0;
var GX2=600;
var GY2=600;

//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");

//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");
function setup() {

  createCanvas(GX2, GY2);
  frameRate(100);
}


function draw() {
  background(255);
  //funciona

  obstaculos.show();

  //desenhar o objetivo
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);
  fill(0, 0, 255);
  ellipse(GX1, GY1, 10, 10);
  ellipse(GX2, GY1, 10, 10);
  ellipse(GX1, GY2, 10, 10);
  ellipse(GX2, GY2, 10, 10);




  if (test.allDotsDead()) {
    console.log(neuronios);
    console.log(increaseMovesBy);
    //algoritmo genético
    if (choice==1) {
      test.calculateFitness();
    } else if (choice==2) {
      test.calculateFitness2();
    }
    test.naturalSelection();
    test.mutateBabies();
  } else {
    //se quaisquer outros pontos ainda está vivo, então atualize e os mostre

    if (choice==1) {
      test.update();
    } else if (choice==2) {
      test.update2();
    }
    test.show();
  }
}
