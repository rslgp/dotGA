class Lines {
	var lines = []; //Vector de Line, array dinamico
	
	function add(l) { //Adicionar linha
		lines.push(l);
	}
	
	function show() {
    //percorrer linhas e desenhar elas como faz nos dots 
		for(let i = 0; i < lines.length; i++){
			lines[i].show();
		}
	}
}
