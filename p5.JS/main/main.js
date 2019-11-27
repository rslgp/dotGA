var QtdDeBixo = 100;
var increaseMovesBy = 5;
var neuronios = 5;
var periodoDeAtualizacaoDaPopulacao=0;
let choice = 2;
var mutation =  0.01;
var Xgoal=300, Ygoal=300;
let rodando = 0;

if (choice==2) {
  neuronios = 10;
  QtdDeBixo = 50;
  mutation = 0.1;
} else if (choice==1) {
  QtdDeBixo = 100;
  increaseMovesBy = 5;
  mutation = 0.01;
}

var test = new Population(QtdDeBixo);
var goal = new Point(Xgoal, Ygoal);
var obstaculos = new Lines();

let x1, y1, x2, y2;
//limites do grid, usado no Dot.js no outOfGrid()
var GX1=0;
var GY1=0;
var GX2=600;
var GY2=600;

function setup() {

  createCanvas(GX2, GY2);
  frameRate(100);
}

function mousePressed(event) {
  console.log(event + "1");
  console.log("primeiro ponto: "  + mouseX + " " + mouseY);
  x1=mouseX;
  y1=mouseY;
}

function mouseReleased(event) {
  console.log("segundo ponto: "  + mouseX + " " + mouseY);
  x2=mouseX;
  y2=mouseY;

  obstaculos.add(new Line([x1, y1], [x2, y2]));
}



function draw() {
 obstaculos.show();
  
  if(!rodando){
    return;
  }
  goal = new Point(Xgoal, Ygoal);
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
    console.log("gen = "+ test.gen);
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

//==========================================

function mudarGoal (){
  Xgoal = document.getElementById('x').value;
  Ygoal = document.getElementById('y').value;
 // console.log(goal);
}

function mudarPopulacao(){
  QtdDeBixo = document.getElementById('tamPopulacao').value;
}

function mudarMovimento(){
  increaseMovesBy = document.getElementById('movimento').value;
}

function mudarGeracao(){//TODO: VAI BRUNO
  periodoDeAtualizacaoDaPopulacao=document.getElementById('geracao').value;;
}

function rodar(){
   rodando^=1; 
   if(rodando){
      test = new Population(QtdDeBixo);
   }
}
