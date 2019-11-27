class Brain {
  constructor(size) {
    this.length = size;
    this.directions = [];
    this.step = 0;
    for (let f = 0; f < size; f++) {
      this.directions.push(new Point());
    }
    // console.log("Foram adicionados: ", size, " pontos ao Brain");
    // console.log("Preparar randomização.");
    this.randomize();
  }

  randomize() {
    let randomAngle=0;	
    for (let i = 0; i < this.directions.length; i++) {
      randomAngle = Math.random()*6.2830;//2*PI
      //console.log("angle1="+randomAngle);
      this.directions[i].fromAngle(randomAngle); //PVector.fromAngle
      this.directions[i].angle=randomAngle;
    }
    //console.log("Houve randomização!")
  }

  clone() {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i].copy();
    }
    //console.log("Clonando Brain");
    return clone;
  }

  mutate() {
    let mutationRate = mutation;
    let randomAngle=0;
    let rand=0;
    for (let i = 0; i < this.directions.length; i++) {
      rand = Math.random()*1;//entre 0 e 1 (0 e 100%)
      if (rand < mutationRate) {
        randomAngle = Math.random()*6.2830;
        //console.log("mutated angle="+randomAngle);
        this.directions[i].fromAngle(randomAngle); //PVector.fromAngle
        this.directions[i].angle=randomAngle;
      }
    }
    //console.log("Mutacionando com taxa de mutação:", mutationRate);
  }

  increaseMoves() {
    neuronios += increaseMovesBy;
    this.length=neuronios;
    let randomAngle = 0;
    if (this.length > 3000) { 
      return;
    }//pra parar de travar o navegador
    for (var i = 0; i< increaseMovesBy; i++) { //Começa incrementando de 5 em 5 
      this.directions.push(new Point());
      randomAngle = Math.random()*6.2830;
      //console.log("mutated angle="+randomAngle);
      this.directions[this.directions.length-1].fromAngle(randomAngle); //PVector.fromAngle
      this.directions[i].angle=Math.floor(randomAngle);
    }
  }

  getColor() {
    let rgb = [0, 0, 0];
    let n = this.directions.length;
    //console.log(this.directions);
    let lim1 = Math.floor(n/3);
    let lim2 = Math.floor(n/3+n/3);
      console.log(rgb);
    for (let i = 0; i<lim1; i++) {
      rgb[0]=(rgb[0]+this.directions[i].angle)%255;
    }
    
    for (let i = lim1+1; i<lim2; i++) {
      //console.log((i < n));
      rgb[1]=(rgb[1]+this.directions[i].angle)%255;
    }
    for (let i = lim2+1; i<n; i++) {
      rgb[2]=(rgb[2]+this.directions[i].angle)%255;
    }
    //console.log(rgb);
    rgb[0]=Math.floor(rgb[0])%255;
    rgb[1]=Math.floor(rgb[1])%255;
    rgb[2]=Math.floor(rgb[2])%255;

   // console.log(rgb);
    return rgb;
  }
}
