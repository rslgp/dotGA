class Line{
   PVector p1, p2; 
   
   Line(PVector pp1, PVector pp2){
      p1=pp1;
      p2=pp2;
   }
  
  void show(){
     //funcoes de desenhar reta usando 2 pontos aqui, parecido como faz nos dots
     fill(0);
     reta(p1,p2);
  }
  
}
