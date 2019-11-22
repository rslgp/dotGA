class Lines{
   Line lines[];//array dinamico por favor
   
   void add(Line l){
       lines.push_back(l);//adicionar linha aqui
   }  
  
  void show(){
     //percorrer linhas e desenhar elas como faz nos dots 
      for (int i = 0; i< lines.length; i++) {
      lines[i].show();
    }
  }
}
