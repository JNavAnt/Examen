const P1 = {x: 0, y: 0};
const P2 = {x: 0, y: 0};
const P3 = {x: 0, y: 0};
const P4 = {x: 0, y: 0};
const P5 = {x: 0, y: 0};
const P6 = {x: 0, y: 0};

var partes = 0; 
var grados;
var w;
var CX1;
var CX2;
var CX3;
var r;
function setup() {
    createCanvas(windowWidth, windowHeight)
     w = windowWidth;
     CX1 = windowWidth/4;
     CX2 = CX1*2;
     CX3 = CX1*3;
     CY = (windowHeight/4)*2;
     d = 200;
     r = d/2;
    

}

/*Dibujar entidades */
function draw(){
    circle(CX1, CY, d);
    circle(CX2, CY, d);
    circle(CX3, CY, d);
    if(partes>1){
        grados = 360/partes;
        for(var i=0;i<partes/2;i++){


            var rad = radians(grados*i)
            var x = r * (Math.cos(rad));
            var y = r * (Math.sin(rad));
            P1.x = floor(CX1-x)
            P1.y = floor(CY-y)
            P2.x = floor(CX1+x)
            P2.y = floor(CY+y)
            P3.x = floor(CX2-x)
            P3.y = floor(CY-y)
            P4.x = floor(CX2+x)
            P4.y = floor(CY+y)
            P5.x = floor(CX3-x)
            P5.y = floor(CY-y)
            P6.x = floor(CX3+x)
            P6.y = floor(CY+y)
            //ine(P1.x, P1.y, P2.x, P2.y)
            //console.log(P1.x, P1.y, P2.x, P2.y);

            
            
           puntoPendiente(P1,P2);
            DDA(P3,P4);
            bresenham(P5,P6);

        }
    }
    //clear();
}
function btnPress(){
    clear();
    partes = document.getElementById("texto").value;
}

function puntoPendiente(p1, p2){
    if(p2.x<p1.x)
    {
        let auxiliar=p2.x
        p2.x=p1.x
        p1.x = auxiliar

        auxiliar = p2.y
        p2.y=p1.y
        p1.y=auxiliar
    }
    
    
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const m = dy/dx;
    const b = p1.y - (m * p1.x);


    point(p1.x, p1.y);
   
    
    if(p1.x == p2.x){
        if(p1.y>p2.y)
        {
            let auxiliar = p1.y
            p1.y = p2.y
            p2.y = auxiliar 
        }
        let x = p1.x
        y = p1.y + 1

		while(y != p2.y){
			point(x, y)
			y++
		}
    }
    else{
        let x = p1.x + 1;
        let y
        while(x != p2.x){
            y = m * x + b;
            y=floor(y)
            point(x,y);
            x++;
        }
    }
}

function DDA(p1, p2){
    const dx = p2.x-p1.x;
    const dy = p2.y-p1.y;
    let x = p1.x;
    let y = p1.y;
    let stop=0;
    let stepX=0;
    let stepY=0;

    if(dx>dy){
        stop = dx;
    }else if(dx<dy){
        stop = dy;
    }
    stepX = dx/stop;
    stepY = dy/stop;

    for(i=1;i<=stop;i++)
      {
        point(x,y);
         x+=stepX;
         y+=stepY;
         
      }
}

function bresenham(p1, p2){

    let pY  
    let pX
    let x
    let y
    let p
    let incE
    let incNE

    let dx = p2.x - p1.x
    let dy = p2.y - p1.y

   if(dy < 0) {
       dy = -dy
       pY = -1
   }else{
       pY = 1
   }

   if(dx < 0) {
       dx = -dx
       pX = -1
   }else{
       pX = 1
   }

   x = p1.x
   y = p1.y
   
   point(x,y)


   if(dx > dy) {
       
       
       p = 2 * dy - dx
       incE = 2 * dy
       incNE = 2 * (dy - dx)

       while(x != p2.x) {
           x += pX

           if(p < 0) {
               p += incE
           }else {
               y += pY
               p += incNE
           }

           point(x,y)
       }
   
   }else{
       
       p = 2 * dx - dy
       incE = 2 * dx
       incNE = 2 * (dx - dy)

       while(y != p2.y) {
           y += pY

           if(p < 0) {
               p += incE
           }else {
               x += pX
               p += incNE
           }

           point(x,y)


   }
   
 }
}
        
