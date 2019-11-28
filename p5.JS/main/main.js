let QtdDeBixo = 100;
let increaseMovesBy = 5;
let neuronios = 5;
let periodoDeAtualizacaoDaPopulacao = 5;
let choice = 1 ;
let mutation =  0.01;
let Xgoal=300, Ygoal=300;
let rodando = 0;



let test = new Population(QtdDeBixo);
let goal = new Point(Xgoal, Ygoal);
let obstaculos = new Lines();

let x1, y1, x2, y2;
//limites do grid, usado no Dot.js no outOfGrid()
var GX1=0;
var GY1=0;
var GX2=600;
var GY2=600;

function setup() {
  trocar();
  createCanvas(GX2, GY2);
  frameRate(400);
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
  if (x1<GX1 || x1>GX2 || x2<GX1 || x2>GX2 || y1<GY1 || y1>GY2 || y2<GY1 || y2>GY2) {
    return;
  }
  obstaculos.add(new Line([x1, y1], [x2, y2]));
}



function draw() {
  obstaculos.show();

  if (!rodando) {
    return;
  }
  goal = new Point(Xgoal, Ygoal);
  background(255);
  //funciona
  obstaculos.show();

  //desenhar o objetivo
  fill('#51dacf');
  ellipse(goal.x, goal.y, 10, 10);


  fill('#74aaa8');
  textSize(36);
  text("Generation: " + test.gen, 50, 50);



  if (test.allDotsDead()) {
    console.log(neuronios);
    console.log(increaseMovesBy);
    //console.log("gen = "+ test.gen);
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

    test.update();
    test.show();
  }
}

//==========================================

function mudarGoal () {
  Xgoal = document.getElementById('x').value;
  Ygoal = document.getElementById('y').value;
  // console.log(goal);
}

function mudarPopulacao() {
  QtdDeBixo = document.getElementById('tamPopulacao').value;
}

function mudarMovimento() {//isso trava tudo
  increaseMovesBy = document.getElementById('movimento').value;
}

function mudarGeracao() {
  periodoDeAtualizacaoDaPopulacao=document.getElementById('geracao').value;
}

function trocar() {
  let berg = document.getElementById("dale1").checked;
  if (berg) {
    choice=1;
  } else {
    choice=2;
  }
  console.log("choice ="+choice);
  QtdDeBixo = document.getElementById('tamPopulacao').value;
  if (choice==2) {
    neuronios = 500;
    mutation = 0.0013;
    increaseMovesBy = 10;
  } else if (choice==1) {
    increaseMovesBy = 5;
    mutation = 0.1;
    neuronios = 10;
  }
  rodando=0;
}

function rodar() {
  mudarGoal ();
  QtdDeBixo = document.getElementById('tamPopulacao').value;
  trocar();
  //increaseMovesBy = document.getElementById('movimento').value;

  console.log("X e Y do objetivo:", Xgoal, Ygoal);
  console.log("Tamanho da população:", QtdDeBixo);
  console.log("Velocidade de incremento:", increaseMovesBy);
  rodando^=1; 
  if (rodando) {
    test = new Population(QtdDeBixo);
  }
}
