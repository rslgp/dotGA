class Point{
	var x;
	var y;

	constructor(xx,yy){
		x = xx;
		y = yy;
	}

	function add(otherPv){//pra adicionar vel na pos do dot
		this.x += otherPv.x;
		this.y += otherPv.y;
	}

	function fromAngle(angle){//pra gerar as direcoes no brain
		this.x = Math.cos(angle);
		this.y = Math.sin(angle);
	}

	function copy(){
		return Point(this.x,this.y);
	}

	function dist(other){//pra pegar ditancia entre dot e outro ponto (dots[i].dist(goal), por exemplo)
		let dx = this.x - other.x;
		let dy = this.y - other.y;
		return Math.hypot(dx,dy);
	}

	function size(){//pega tamanho do vector
		return Math.hypot(this.x,this.y);
	}

	function normalize(){//faz vector ter norma 1
		let norm = this.size();
		this.x /= norm;
		this.y /= norm;
	}

	function limit(lim){//limita norma do vector, usado no move
		let sz = this.size();
		if(sz > lim){
			this.x = Math.cos(lim);
			this.y = Math.sin(lim);
		}
	}	

}
