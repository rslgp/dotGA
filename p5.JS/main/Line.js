class Line {
  constructor(pp1, pp2) {
    this.p1 = new Point(pp1);
    this.p2 = new Point(pp2);
    console.log("Novos pontos: ", this.p1, this.p2);
  }

  show() {
    // Eu adicionei this aos p's mas acho que
    // ainda assim falte conteúdo pra esse método
    ctx.moveTo(this.p1.x, this.p1.y); // Move para o ponto 1 da reta
    // ctx.fillStyle = "#";  detalhe de cor
    fill();			                  // Fill não recebe parâmetro
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
