//Population test;

var parObjetivo = [];

  parObjetivo.push(400);
  parObjetivo.push(10);
  
  console.log(parObjetivo);
 
var QtdDeBixo = 0;

function setup() {
   createCanvas(800,800);
   frameRate(100);
   //teste = new Population(QtdDeBixo);
}


function draw() {
  background(220);
  
  //desenhar o objetivo
  fill(255,0,0);
  ellipse(parObjetivo[0],parObjetivo[1],10,10);
}
