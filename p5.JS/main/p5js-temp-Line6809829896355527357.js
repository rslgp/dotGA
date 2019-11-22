class Line{
     var p1;
     var p2;

    Line(pp1,pp2){
        p1 = new Point(pp1);
        p2 = new Point(pp2);
    }

    function show{
        ctx.moveTo(p1.x,p1.y)
        fill(0);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
    }
}
