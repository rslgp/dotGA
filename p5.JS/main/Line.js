class Line{
	constructor(pp1,pp2){
		this.p1 = new Point(pp1);
		this.p2 = new Point(pp2);
	}

	show{
		ctx.moveTo(p1.x,p1.y);
		fill(0);
		ctx.lineTo(p2.x,p2.y);
		ctx.stroke();
	}
}
