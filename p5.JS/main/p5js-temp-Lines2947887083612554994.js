class Lines {
  constructor() {
    this.lines = [];//lista de linhas
  }	

  add(line) { //Adicionar linha
    this.lines.push(line);
    console.log(this.lines.length);
  }

  show() {
    //percorrer linhas e desenhar elas como faz nos dots 
       stroke(126);

    for (let i = 0; i < this.lines.length; i++) {
      
      this.lines[i].show();
    }
  }
}
