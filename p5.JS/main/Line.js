class Line {
  constructor(pp1, pp2) {
    this.p1 = new Point(pp1);
    this.p2 = new Point(pp2);
    console.log("Nova linha: ", this.p1, this.p2);
  }

  show() {
    //moveTo(this.p1.x, this.p1.y); // Move para o ponto 1 da reta
    // ctx.fillStyle = "#";  detalhe de cor
    //fill(0,255,0);                // Fill não recebe parâmetro
    //lineTo(this.p2.x, this.p2.y);
    //fill(0,255,0); 
    //stroke(255);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
   

//    console.log("linha="+this.p1.x+' '+ this.p1.y+' '+  this.p2.x+' '+ this.p2.y);
  }
}
