class Lines {
	// Adicionei esse linha abaixo
	let lines; 
	
	constructor(){
		this.lines = [];//lista de linhas
	}	

	add(line) { //Adicionar linha
		lines.push(line);
	}

	show() {
		//percorrer linhas e desenhar elas como faz nos dots 
		for(let i = 0; i < lines.length; i++){
			lines[i].show();
		}
	}
}
